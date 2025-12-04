// xml_smart_diff.cpp
// Build: g++ -std=c++17 xml_smart_diff.cpp -o xml_smart_diff `pkg-config --cflags --libs libxml-2.0` -lpugixml
// Run: ./xml_smart_diff output.xml smallest_circuit.xml [schema.xsd]

#include <pugixml.hpp>
#include <libxml/xmlschemastypes.h>
#include <libxml/parser.h>
#include <libxml/xmlmemory.h>

#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <vector>
#include <set>
#include <string>
#include <algorithm>
#include <cmath>
#include <ctime>

using namespace std;

// ANSI colors
#define ANSI_RED    "\033[31m"
#define ANSI_GREEN  "\033[32m"
#define ANSI_YELLOW "\033[33m"
#define ANSI_RESET  "\033[0m"

// Output files
static const char *TEXT_REPORT = "diff_report.txt";
static const char *HTML_REPORT = "diff_report.html";

// Global filenames for better reporting
string fileNameA;
string fileNameB;

// Simple utilities
string now_iso8601() {
    time_t t = time(nullptr);
    char buf[64];
    strftime(buf, sizeof(buf), "%Y-%m-%dT%H:%M:%S", localtime(&t));
    return string(buf);
}

string escape_html(const string &s) {
    string out;
    out.reserve(s.size());
    for(char c: s) {
        switch(c) {
            case '&': out += "&amp;"; break;
            case '<': out += "&lt;"; break;
            case '>': out += "&gt;"; break;
            case '"': out += "&quot;"; break;
            default: out += c; break;
        }
    }
    return out;
}

bool validate_xml_with_xsd(const char* xmlPath, const char* xsdPath, string &message) {
    xmlSchemaPtr schema = nullptr;
    xmlSchemaParserCtxtPtr pctxt = nullptr;
    xmlSchemaValidCtxtPtr vctxt = nullptr;
    xmlDocPtr doc = nullptr;
    bool ok = false;
    int ret = -1;  // <--- moved here

    xmlLineNumbersDefault(1);

    pctxt = xmlSchemaNewParserCtxt(xsdPath);
    if (!pctxt) {
        message = string("Failed to create XSD parser context for '") + xsdPath + "'";
        goto cleanup;
    }

    schema = xmlSchemaParse(pctxt);
    if (!schema) {
        message = string("Failed to parse XSD schema '") + xsdPath + "'.";
        goto cleanup;
    }

    vctxt = xmlSchemaNewValidCtxt(schema);
    if (!vctxt) {
        message = string("Failed to create XSD validation context.");
        goto cleanup;
    }

    doc = xmlReadFile(xmlPath, nullptr, 0);
    if (!doc) {
        message = string("Failed to read XML file '") + xmlPath + "'.";
        goto cleanup;
    }

    ret = xmlSchemaValidateDoc(vctxt, doc);
    if (ret == 0) {
        ok = true;
        message = "Validation successful.";
    } else if (ret > 0) {
        ok = false;
        message = "Validation failed: document does not conform to schema.";
    } else {
        ok = false;
        message = "Validation produced an internal error.";
    }

cleanup:
    if (doc) xmlFreeDoc(doc);
    if (vctxt) xmlSchemaFreeValidCtxt(vctxt);
    if (schema) xmlSchemaFree(schema);
    if (pctxt) xmlSchemaFreeParserCtxt(pctxt);
    xmlCleanupParser();
    return ok;
}

// ---------- Comparison engine ----------
//
// We'll do an order-insensitive comparison: group children by tag name, try to match children
// from A to children from B with same tag name using a simple scoring function (attributes match + subtree child-name overlap).
//

struct DiffEntry {
    string path;
    string type; // "MATCH", "MISSING", "EXTRA", "ATTR_DIFF", "VALUE_DIFF"
    string details;
    bool ok;
};

vector<DiffEntry> diffs;

// Helper: build a "signature" (child tag names sorted) for a node to estimate similarity
vector<string> child_tag_list(const pugi::xml_node &n) {
    vector<string> tags;
    for (auto c = n.first_child(); c; c = c.next_sibling()) {
        if (c.type() == pugi::node_element) tags.push_back(string(c.name()));
    }
    sort(tags.begin(), tags.end());
    return tags;
}

// Score similarity between two nodes (simple heuristic)
double node_similarity_score(const pugi::xml_node &a, const pugi::xml_node &b) {
    // attribute matches
    int totalAttr = 0, matchedAttr = 0;
    for (auto attr = a.first_attribute(); attr; attr = attr.next_attribute()) {
        totalAttr++;
        pugi::xml_attribute ob = b.attribute(attr.name());
        if (ob && string(ob.value()) == string(attr.value())) matchedAttr++;
    }
    int totalAttrB = 0;
    for (auto attr = b.first_attribute(); attr; attr = attr.next_attribute()) totalAttrB++;

    double attrScore = 0.0;
    if (totalAttr + totalAttrB > 0) {
        attrScore = (double)matchedAttr / max(1, max(totalAttr, totalAttrB));
    }

    // child tag overlap
    vector<string> ta = child_tag_list(a);
    vector<string> tb = child_tag_list(b);
    // compute intersection size
    int i=0,j=0;
    int common=0;
    while(i < (int)ta.size() && j < (int)tb.size()) {
        if (ta[i]==tb[j]) { common++; i++; j++; }
        else if (ta[i] < tb[j]) i++; else j++;
    }
    double childScore = 0.0;
    int denom = max(1, (int)max(ta.size(), tb.size()));
    childScore = (double)common / denom;

    // name match (binary) - we'll assume names equal when called
    double score = 0.6*attrScore + 0.4*childScore;
    return score;
}

string make_path(const string &base, const pugi::xml_node &n) {
    // Try to get distinguishing info: name and if it has id/ref attributes
    string nm = n.name();
    string extra;
    pugi::xml_attribute idAttr;
    if ((idAttr = n.attribute("id"))) extra += string("[id=")+idAttr.value()+"]";
    else if ((idAttr = n.attribute("name"))) extra += string("[name=")+idAttr.value()+"]";
    else if ((idAttr = n.attribute("refDes"))) extra += string("[refDes=")+idAttr.value()+"]";
    // fallback: use position among siblings of same name
    int pos=1;
    for (auto sib = n.previous_sibling(); sib; sib = sib.previous_sibling()) {
        if (sib.type()==pugi::node_element && string(sib.name())==nm) pos++;
    }
    if (pos>1) extra += string("[#")+to_string(pos)+"]";
    return base + "/" + nm + extra;
}

void log_diff(const string &path, const string &type, const string &details, bool ok) {
    DiffEntry d { path, type, details, ok };
    diffs.push_back(d);
}

// Core recursive comparator
// Compare node a (from doc A) with node b (from doc B) at current path
void compare_nodes(const pugi::xml_node &a, const pugi::xml_node &b, const string &path) {
    // Node names should already match when called; but check text values if element holds text
    // Check attributes differences
    // Build attribute map for both
    map<string,string> attrA, attrB;
    for (auto at = a.first_attribute(); at; at = at.next_attribute()) attrA[string(at.name())] = string(at.value());
    for (auto bt = b.first_attribute(); bt; bt = bt.next_attribute()) attrB[string(bt.name())] = string(bt.value());

    // Check for attributes that exist in the reference (B)
for (auto &p : attrB) {
    auto it = attrA.find(p.first);
    if (it == attrA.end()) {
        // Missing in fileA → ERROR
        log_diff(path, "MISSING_ATTRIBUTE", "Required attribute '" + p.first +
                 "' (value='" + p.second + "') missing in " + fileNameA, false);
    } else {

    // Present in both — compare values
    string valA = it->second;
    string valB = p.second;

    auto isNumber = [](const string &s) {
        char* end = nullptr;
        std::strtod(s.c_str(), &end);
        return end != s.c_str() && *end == '\0';
    };

    bool mismatch = false;
    if (isNumber(valA) && isNumber(valB)) {
        double numA = atof(valA.c_str());
        double numB = atof(valB.c_str());
        double diff = fabs(numA - numB);
        // tolerate very small numeric difference
        if (diff > 1e-6)
            mismatch = true;
    } else {
        // compare as strings (case-sensitive)
        mismatch = (valA != valB);
    }

    if (mismatch) {
        log_diff(path, "ATTRIBUTE_VALUE_MISMATCH",
                 "Attribute '" + p.first + "' differs: " + fileNameA + "='" + valA +
                 "', " + fileNameB + "='" + valB + "'", false);
    }
    }
}

    // If both nodes have immediate text children (simple content), compare trimmed text
    string textA, textB;
    for (auto c = a.first_child(); c; c = c.next_sibling()) {
        if (c.type()==pugi::node_pcdata || c.type()==pugi::node_cdata) { textA += string(c.value()); }
    }
    for (auto c = b.first_child(); c; c = c.next_sibling()) {
        if (c.type()==pugi::node_pcdata || c.type()==pugi::node_cdata) { textB += string(c.value()); }
    }
    auto trim = [](string s) {
        size_t i=0,j=s.size();
        while (i<j && isspace((unsigned char)s[i])) i++;
        while (j>i && isspace((unsigned char)s[j-1])) j--;
        return s.substr(i,j-i);
    };
    textA = trim(textA);
    textB = trim(textB);
    if (!textA.empty() || !textB.empty()) {
        if (textA == textB) {
            // log_diff(path, "TEXT_MATCH", "Element text matched: '" + textA + "'", true);
        } else {
            log_diff(path, "TEXT_MISMATCH", "Element text mismatch: " + fileNameA + "='" + textA + "' " + fileNameB + "='" + textB + "'", false);
        }
    }

    // Now compare children elements ignoring order
    // Build map <tagname, vector<node>> for children in A and B
    map<string, vector<pugi::xml_node>> childrenA, childrenB;
    for (auto c = a.first_child(); c; c = c.next_sibling()) {
        if (c.type()==pugi::node_element) childrenA[string(c.name())].push_back(c);
    }
    for (auto c = b.first_child(); c; c = c.next_sibling()) {
        if (c.type()==pugi::node_element) childrenB[string(c.name())].push_back(c);
    }

    // For each tag present in A, attempt to match to tags in B
    for (auto &kv: childrenA) {
        const string &tag = kv.first;
        auto &vecA = kv.second;
        auto itB = childrenB.find(tag);
        if (itB == childrenB.end()) {
            // all nodes of this tag are missing in B
            for (auto &nodeA : vecA) {
                string p = make_path(path, nodeA);
                log_diff(p, "MISSING_ELEMENT", "Element <" + tag + "> present in " + fileNameA + " but missing in " + fileNameB, false);
                // still attempt to log attributes of missing node
                for (auto at = nodeA.first_attribute(); at; at = at.next_attribute())
                    log_diff(p, "MISSING_ATTRIBUTE", string("Attribute '") + at.name() + "' value='" + at.value() + "'", false);
            }
            continue;
        }

        auto &vecB = itB->second;
        // We'll greedily match items in vecA to vecB by highest similarity
        vector<bool> usedB(vecB.size(), false);
        for (auto &nodeA : vecA) {
            double bestScore = -1.0;
            int bestIdx = -1;
            for (size_t i=0;i<vecB.size();++i) {
                if (usedB[i]) continue;
                double s = node_similarity_score(nodeA, vecB[i]);
                if (s > bestScore) { bestScore = s; bestIdx = (int)i; }
            }
            if (bestIdx == -1) {
                // no candidate (shouldn't happen because tag exists)
                string p = make_path(path, nodeA);
                log_diff(p, "MISSING_ELEMENT", "Element <" + tag + "> has no match in " + fileNameB, false);
                continue;
            }
            usedB[bestIdx] = true;
            // match nodeA with vecB[bestIdx]
            string p = make_path(path, nodeA);
            // log_diff(p, "ELEMENT_MATCH_ATTEMPT", "Matched element <" + tag + "> with score=" + to_string(bestScore), bestScore > 0.0);
            compare_nodes(nodeA, vecB[bestIdx], p);
        }

        // Any unused nodes in vecB are extras in B
        for (size_t i=0;i<vecB.size();++i) {
            if (!usedB[i]) {
                string p = make_path(path, vecB[i]);
                log_diff(p, "EXTRA_ELEMENT", "Element <" + tag + "> present in " + fileNameB + " but not matched to " + fileNameA, false);
                // also log attributes of extra node
                for (auto at = vecB[i].first_attribute(); at; at = at.next_attribute())
                    log_diff(p, "EXTRA_ATTRIBUTE", string("Attribute '") + at.name() + "' value='" + at.value() + "'", false);
            }
        }
    }

    // Tags present in B but not in A
    for (auto &kv: childrenB) {
        const string &tag = kv.first;
        if (childrenA.find(tag) == childrenA.end()) {
            for (auto &nodeB: kv.second) {
                string p = make_path(path, nodeB);
                log_diff(p, "EXTRA_ELEMENT", "Element <" + tag + "> present in " + fileNameB + " but missing in " + fileNameA, false);
            }
        }
    }
}

// Top-level compare: find root nodes and then call compare_nodes
void compare_documents(const pugi::xml_document &docA, const pugi::xml_document &docB) {
    auto rootA = docA.document_element();
    auto rootB = docB.document_element();
    if (!rootA || !rootB) {
        log_diff("/", "ERROR", "One of the documents has no root element", false);
        return;
    }
    // If root names differ, log and still try to compare if namespaces match? We'll log both.
    if (string(rootA.name()) != string(rootB.name())) {
        log_diff("/", "ROOT_MISMATCH", string("Root element name differs: ") + fileNameA + "=" + rootA.name() + " " + fileNameB + "=" + rootB.name(), false);
    }
    //  else {
    //     log_diff(string("/") + rootA.name(), "ROOT_MATCH", "Root elements have same name", true);
    // }

    compare_nodes(rootA, rootB, string("/") + rootA.name());
}

// Save reports
void write_text_report(const vector<DiffEntry> &diffs, const string &filePath) {
    ofstream f(filePath);
    f << "XML Smart Diff Report\n";
    f << "Generated: " << now_iso8601() << "\n";
    f << "========================================\n";
    f << "Comparing:\n";
    f << "  File A: " << fileNameA << "\n";
    f << "  File B: " << fileNameB << "\n";
    f << "========================================\n\n";
    
    // Count by category
    map<string, vector<DiffEntry>> categories;
    int totalErrors = 0;
    for (auto &d: diffs) {
        if (!d.ok) {
            categories[d.type].push_back(d);
            totalErrors++;
        }
    }
    
    // Summary
    f << "SUMMARY\n";
    f << "-------\n";
    f << "Total Differences: " << totalErrors << "\n\n";
    for (auto &cat : categories) {
        f << "  " << cat.first << ": " << cat.second.size() << "\n";
    }
    f << "\n========================================\n\n";
    
    // Output by category
    for (auto &cat : categories) {
        f << "\n### " << cat.first << " (" << cat.second.size() << " issues) ###\n\n";
        for (auto &d : cat.second) {
            f << "[DIFF] " << d.path << "\n";
            f << "       " << d.details << "\n\n";
        }
    }
    
    f.close();
}

void write_html_report(const vector<DiffEntry> &diffs, const string &filePath) {
    ofstream f(filePath);
    f << "<!doctype html>\n<html><head><meta charset='utf-8'><title>XML Smart Diff Report</title>\n";
    f << "<style>body{font-family:Arial,Helvetica,sans-serif;} .ok{background:#e6f8e6;border-left:4px solid #09a409;padding:8px;margin:6px 0;} .diff{background:#fde6e6;border-left:4px solid #d30909;padding:8px;margin:6px 0;} .path{font-weight:600;font-family:monospace;} h3{margin-top:30px;padding:10px;background:#f0f0f0;border-left:5px solid #333;} .summary{background:#fffacd;padding:15px;margin:20px 0;border-radius:5px;} .files{background:#e8f4f8;padding:10px;margin:10px 0;border-radius:5px;font-family:monospace;}</style>\n</head><body>\n";
    f << "<h2>XML Smart Diff Report</h2>\n";
    f << "<p>Generated: " << now_iso8601() << "</p>\n";
    f << "<div class='files'><strong>Comparing:</strong><br>File A: " << escape_html(fileNameA) << "<br>File B: " << escape_html(fileNameB) << "</div>\n";
    
    // Count by category
    map<string, vector<DiffEntry>> categories;
    int totalErrors = 0;
    for (auto &d: diffs) {
        if (!d.ok) {
            categories[d.type].push_back(d);
            totalErrors++;
        }
    }
    
    // Summary
    f << "<div class='summary'><strong>Total Differences: " << totalErrors << "</strong><br>";
    for (auto &cat : categories) {
        f << cat.first << ": " << cat.second.size() << "<br>";
    }
    f << "</div>\n";
    
    // Output by category
    for (auto &cat : categories) {
        f << "<h3>" << escape_html(cat.first) << " (" << cat.second.size() << " issues)</h3>\n";
        for (auto &d : cat.second) {
            f << "<div class='diff'>";
            f << "<div class='path'>" << escape_html(d.path) << "</div>";
            f << "<div class='details'>" << escape_html(d.details) << "</div>";
            f << "</div>\n";
        }
    }
    
    f << "</body></html>\n";
    f.close();
}

// Print colored summary to console
void print_summary_console(const vector<DiffEntry> &diffs) {
    int okCount = 0, diffCount = 0;
    for (auto &d : diffs) {
        if (d.ok) okCount++; else diffCount++;
    }
    // cout <<"\n===== XML Smart Diff Summary =====\n";
    // cout <<ANSI_GREEN << "Matches: " << okCount << ANSI_RESET << "   " << ANSI_RED << "Differences: " << diffCount << ANSI_RESET << "\n\n";
    // Print the most significant diffs (non-ATTRIBUTE_MATCH and non-ELEMENT_MATCH_ATTEMPT)
    for (auto &d : diffs) {
        if (d.type == "ATTRIBUTE_MATCH" || d.type == "TEXT_MATCH" || d.type == "ELEMENT_MATCH_ATTEMPT") continue;
        if (d.ok) {
            // cout <<ANSI_GREEN << "✓ " << d.path << " : " << d.type << ANSI_RESET << " -> " << d.details << "\n";
        } else {
            // cout <<ANSI_RED << "✗ " << d.path << " : " << d.type << ANSI_RESET << " -> " << d.details << "\n";
        }
    }
    // cout <<"\nDetailed report saved to: " << TEXT_REPORT << " and " << HTML_REPORT << "\n";
}

// Small helper to try to load xml via pugixml and return bool
bool load_pugi_doc(const char* path, pugi::xml_document &doc, string &err) {
    pugi::xml_parse_result res = doc.load_file(path, pugi::parse_default | pugi::parse_trim_pcdata);
    if (!res) {
        err = string("Failed to parse XML '") + path + "' : " + res.description();
        return false;
    }
    return true;
}

// Main
int main(int argc, char** argv) {
    if (argc < 3) {
        cerr << "Usage: " << argv[0] << " fileA.xml fileB.xml [schema.xsd]\n";
        return 1;
    }

    const char* fileA = argv[1];
    const char* fileB = argv[2];
    const char* xsd = (argc >= 4) ? argv[3] : nullptr;

    // Store filenames globally for better reporting
    fileNameA = string(fileA);
    fileNameB = string(fileB);
    // Extract just the filename without path
    size_t posA = fileNameA.find_last_of("/\\");
    if (posA != string::npos) fileNameA = fileNameA.substr(posA + 1);
    size_t posB = fileNameB.find_last_of("/\\");
    if (posB != string::npos) fileNameB = fileNameB.substr(posB + 1);

    // cout <<"XML Smart Diff\n";
    // cout <<"File A: " << fileA << " (" << fileNameA << ")\n";
    // cout <<"File B: " << fileB << " (" << fileNameB << ")\n";
    // if (xsd) 
    // // cout <<"Schema: " << xsd << "\n";

    // Optional: validate with XSD
    // if (xsd) {
    //     // cout <<"\nValidating files against XSD...\n";
    //     string msgA, msgB;
    //     bool okA = validate_xml_with_xsd(fileA, xsd, msgA);
    //     bool okB = validate_xml_with_xsd(fileB, xsd, msgB);
    //     // cout <<" - " << fileA << ": " << (okA ? ANSI_GREEN "VALID" ANSI_RESET : ANSI_RED "INVALID" ANSI_RESET) << " (" << msgA << ")\n";
    //     // cout <<" - " << fileB << ": " << (okB ? ANSI_GREEN "VALID" ANSI_RESET : ANSI_RED "INVALID" ANSI_RESET) << " (" << msgB << ")\n";
    //     log_diff(string(fileA), string("XSD_VALIDATION"), string("Validation: ") + msgA, okA);
    //     log_diff(string(fileB), string("XSD_VALIDATION"), string("Validation: ") + msgB, okB);
    // }

    // Load both docs using pugixml (for structural comparisons)
    pugi::xml_document docA, docB;
    string err;
    if (!load_pugi_doc(fileA, docA, err)) {
        cerr << "Error loading " << fileA << " : " << err << "\n";
        return 2;
    }
    if (!load_pugi_doc(fileB, docB, err)) {
        cerr << "Error loading " << fileB << " : " << err << "\n";
        return 3;
    }

    // Compare
    compare_documents(docA, docB);

    // Save reports
    write_text_report(diffs, TEXT_REPORT);
    write_html_report(diffs, HTML_REPORT);

    // Console summary
    print_summary_console(diffs);

    return 0;
}

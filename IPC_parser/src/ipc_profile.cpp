#include <sstream>
#include "./include/ipc_profile.h"

using namespace std;

IPCProfile::IPCProfile() {
    polygon = nullptr;
    cutouts.clear();
}

IPCProfile::IPCProfile(TreeNode &profilePtr) {
    for (size_t i = 0; i < profilePtr.children.size(); i++) {  
        cout << "Adding profile: " << profilePtr.children[i].name<< endl;  
        if (profilePtr.children[i].name == "Polygon") {
            cout << "Adding polygon: " << profilePtr.children[i].name << endl;
            float x = 0.0;
            float y = 0.0;
            for(size_t j = 0; j < profilePtr.children[i].attributes.size(); j++) {  
                // cout << "Adding polygon attribute: " << profilePtr.children[i].attributes[j].first << " = " << profilePtr.children[i].attributes[j].second << endl;  
                if(profilePtr.children[i].attributes[j].first == "x") {
                    x = std::stof(profilePtr.children[i].attributes[j].second);
                }
                else if(profilePtr.children[i].attributes[j].first == "y") {
                    y = std::stof(profilePtr.children[i].attributes[j].second);
                }
            }
            polygon = new IPCPolygon(profilePtr.children[i], x, y);

        }

        else if(profilePtr.children[i].name == "Cutout"){
            // cout << "Adding cutout: " << profilePtr.children[i].name << endl;
            cutouts.push_back(new IPCCutout(profilePtr.children[i]));
        }
    }

}


void IPCProfile::profileDisplay(int depth){
    string indent(depth * 4, ' ');
    cout << indent << "Profile"<< endl;

    if(polygon) {
        polygon->polygonDisplay(depth + 1);
    }

    for(size_t i =0 ; i < cutouts.size(); i++){
        cutouts[i]->cutoutDisplay(depth + 1);
    }

}

string IPCProfile::toXML(int indent){
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Profile>\n";

    if(polygon) {
        oss << polygon->toXML(indent + 2);
    }

    for(const auto& cutout : cutouts) {
        oss << cutout->toXML(indent + 2);
    
    }

    oss << tab << "</Profile>\n";
    return oss.str();
}


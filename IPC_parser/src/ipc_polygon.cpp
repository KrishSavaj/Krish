#include <sstream>
#include "./include/ipc_polygon.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"

using namespace std;

IPCFillDescRef::IPCFillDescRef() {
    id = fillPropertyType::VOID;
}

IPCFillDescRef::IPCFillDescRef(TreeNode &fillDescRefPtr) {
    if(fillDescRefPtr.attributes.size() > 0) {
        // cout<<"FillDescRef id: "<< fillDescRefPtr.attributes[0].second << endl;
        std::string idStr = fillDescRefPtr.attributes[0].second;
        // Use magic_enum to convert string to enum
        auto fillType = magic_enum::enum_cast<fillPropertyType>(idStr);
        if(fillType.has_value()) {
            id = fillType.value();
        } else {
            id = fillPropertyType::VOID; // Default
        }
    } else {
          id = fillPropertyType::VOID; 
    }
}


IPCPolygon::IPCPolygon(TreeNode &polygonPtr ,float x, float y)
    // : Coordinate(x, y)
    {
        addPolygonElement(polygonPtr);

  }
    

void IPCPolygon::addPolygonElement(TreeNode &polygonPtr){
    for (size_t i = 0; i < polygonPtr.children.size(); i++) {  
        // cout << "Adding polygon: " << packagePtr.children[i].name<< endl;  
        if (polygonPtr.children[i].name == "PolyBegin") {
            // cout << "Adding polyBegin: " << polygonPtr.children[i].name << endl;
            float x = std::stof(polygonPtr.children[i].attributes[0].second);
            float y = std::stof(polygonPtr.children[i].attributes[1].second);
            begin = new PolyBegin(x,y);

        }

        else if(polygonPtr.children[i].name == "PolyStepSegment"){
            // cout << "Adding pol: " << polygonPtr.children[i].name << endl;
            float x = std::stof(polygonPtr.children[i].attributes[0].second);
            float y = std::stof(polygonPtr.children[i].attributes[1].second);
            steps.push_back(new PolyStepSegment(x,y));
        }
        else if(polygonPtr.children[i].name == "PolyStepCurve"){
            double x, y, centreX, centreY;
            bool clockwise;
            // cout << "Adding pol: " << polygonPtr.children[i].name << endl;
            for(size_t j = 0; j < polygonPtr.children[i].attributes.size(); j++) {  
                // cout << "Adding polygon attribute: " << polygonPtr.children[i].attributes[j].first << " = " << polygonPtr.children[i].attributes[j].second << endl;  

                if(polygonPtr.children[i].attributes[j].first == "x") {
                    x = std::stod(polygonPtr.children[i].attributes[j].second);
                }
                else if(polygonPtr.children[i].attributes[j].first == "y") {
                    y = std::stod(polygonPtr.children[i].attributes[j].second);
                }
                else if(polygonPtr.children[i].attributes[j].first == "centreX") {
                    centreX = std::stod(polygonPtr.children[i].attributes[j].second);
                }
                else if(polygonPtr.children[i].attributes[j].first == "centreY") {
                    centreY = std::stod(polygonPtr.children[i].attributes[j].second);
                }
                else if(polygonPtr.children[i].attributes[j].first == "clockwise") {
                    clockwise = (polygonPtr.children[i].attributes[j].second == "true");
                }

            }

            curves.push_back(new PolyStepCurve(x,y,centreX,centreY,clockwise));
        }
        else if(polygonPtr.children[i].name == "FillDesc"){
            cout << "********************Adding FillDescRef: " << polygonPtr.children[i].name << endl;
            fillDescRef = IPCFillDescRef(polygonPtr.children[i]);
        } 
    }
}

void IPCPolygon :: polygonDisplay(int depth){
    string indent(depth * 4, ' ');
    cout << indent << "Outline"<< endl;

    cout << indent << "  Polygon"<< endl;

        begin->polyBeginDisplay(depth + 2);

        for(size_t i =0 ; i < steps.size(); i++){
            steps[i]->polyStepSegmentDisplay(depth + 2);
        }

        for(size_t i =0 ; i < curves.size(); i++){
            curves[i]->polyStepCurveDisplay(depth + 2);
        }


}

PolyBegin::PolyBegin(float x, float y) : x(x), y(y) {
     

}
void PolyBegin :: polyBeginDisplay(int depth){
        string indent(depth * 4, ' ');
        
         cout <<indent <<"PolyBegin [x: "<< x  <<  "   y:" << y << "]"<<endl;

}
PolyStepSegment::PolyStepSegment(float x, float y) : x(x), y(y) {
   
}
void PolyStepSegment :: polyStepSegmentDisplay(int depth){

    string indent(depth * 4, ' ');
    cout <<indent <<"PolyStepSegment [x: "<< x <<  "   y:" << y << "]"<<endl;

}

PolyStepCurve::PolyStepCurve(double x, double y, double centreX, double centreY, bool clockwise) 
: x(x), y(y), centreX(centreX), centreY(centreY), clockwise(true) {
   
}

void PolyStepCurve :: polyStepCurveDisplay(int depth){

    string indent(depth * 4, ' ');
    cout <<indent <<"PolyStepCurve [x: "<< x <<  "   y:" << y << "   centreX: " << centreX << "   centreY: " << centreY << "   clockwise: " << (clockwise ? "true" : "false")<<"]"<<endl;

}
string PolyStepCurve :: toXML(int indent){    
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<PolyStepCurve "
        << "x=\"" << x << "\" "
        << "y=\"" << y << "\" "
        << "centreX=\"" << centreX << "\" "
        << "centreY=\"" << centreY << "\" "
        << "clockwise=\"" << (clockwise ? "true" : "false") << "\"/>\n";
    return oss.str();
}





string IPCFillDescRef::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<FillDesc "
        << "fillProperty=\"" << magic_enum::enum_name(id) << "\"/>\n";
    return oss.str();
}


string PolyBegin::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<PolyBegin "
        << "x=\"" << x << "\" "
        << "y=\"" << y << "\"/>\n";
    return oss.str();
}

string PolyStepSegment::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<PolyStepSegment "
        << "x=\"" << x << "\" "
        << "y=\"" << y << "\"/>\n";
    return oss.str();
}


string IPCPolygon::toXML(int indent) {
    string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Polygon>\n";

    if (begin) {
        oss << begin->toXML(indent + 3);
    }

    for (const auto& step : steps) {
        oss << step->toXML(indent + 3);
    
    }
    for(const auto& curve : curves) {
        oss << curve->toXML(indent + 3);
    
    }


    oss << fillDescRef.toXML(indent + 3);
    


    oss << tab << "</Polygon>\n";
    return oss.str();
}


IPCCutout::IPCCutout(){
    begin = nullptr;
    steps.clear();
    curves.clear();
}

IPCCutout::IPCCutout(TreeNode &cutoutPtr){
    for (size_t i = 0; i < cutoutPtr.children.size(); i++) {  
        // cout << "Adding polygon: " << packagePtr.children[i].name<< endl;  
        if (cutoutPtr.children[i].name == "PolyBegin") {
            // cout << "Adding polyBegin: " << polygonPtr.children[i].name << endl;
            float x = std::stof(cutoutPtr.children[i].attributes[0].second);
            float y = std::stof(cutoutPtr.children[i].attributes[1].second);
            begin = new PolyBegin(x,y);

        }

        else if(cutoutPtr.children[i].name == "PolyStepSegment"){
            // cout << "Adding pol: " << polygonPtr.children[i].name << endl;
            float x = std::stof(cutoutPtr.children[i].attributes[0].second);
            float y = std::stof(cutoutPtr.children[i].attributes[1].second);
            steps.push_back(new PolyStepSegment(x,y));
        }
        else if(cutoutPtr.children[i].name == "PolyStepCurve"){
            double x = 0.0, y = 0.0, centreX = 0.0, centreY = 0.0;
            bool clockwise = true;
            // cout << "Adding pol: " << polygonPtr.children[i].name << endl;
            for(size_t j = 0; j < cutoutPtr.children[i].attributes.size(); j++) {  
                // cout << "Adding polygon attribute: " << cutoutPtr.children[i].attributes[j].first << " = " << cutoutPtr.children[i].attributes[j].second << endl;  

                if(cutoutPtr.children[i].attributes[j].first == "x") {
                    x = std::stod(cutoutPtr.children[i].attributes[j].second);
                }
                else if(cutoutPtr.children[i].attributes[j].first == "y") {
                    y = std::stod(cutoutPtr.children[i].attributes[j].second);
                }
                else if(cutoutPtr.children[i].attributes[j].first == "centreX") {
                    centreX = std::stod(cutoutPtr.children[i].attributes[j].second);
                }
                else if(cutoutPtr.children[i].attributes[j].first == "centreY") {
                    centreY = std::stod(cutoutPtr.children[i].attributes[j].second);
                }
                else if(cutoutPtr.children[i].attributes[j].first == "clockwise") {
                    clockwise = (cutoutPtr.children[i].attributes[j].second == "true");
                }
            }

            curves.push_back(new PolyStepCurve(x,y,centreX,centreY,clockwise));
        } 
    }

}

void IPCCutout::cutoutDisplay(int depth){
    string indent(depth * 4, ' ');
    cout << indent << "  Cutout"<< endl;

        begin->polyBeginDisplay(depth + 2);

        for(size_t i =0 ; i < steps.size(); i++){
            steps[i]->polyStepSegmentDisplay(depth + 2);
        }

        for(size_t i =0 ; i < curves.size(); i++){
            curves[i]->polyStepCurveDisplay(depth + 2);
        }
}


string IPCCutout::toXML(int indent) {
    string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Cutout>\n";

    if (begin) {
        oss << begin->toXML(indent + 3);
    }

    for (const auto& step : steps) {
        oss << step->toXML(indent + 3);
    
    }

    for (const auto& curve : curves) {
        oss << curve->toXML(indent + 3);
    
    }

    oss << tab << "</Cutout>\n";
    return oss.str();
}

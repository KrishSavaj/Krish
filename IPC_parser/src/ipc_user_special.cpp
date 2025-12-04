#include <sstream>
#include "./include/ipc_user_special.h"

using namespace std;



IPCUserSpecial::IPCUserSpecial(TreeNode &userSpecialPtr) {
    // cout<<" ****************** "<<"Adding UserSpecial: " << userSpecialPtr.name<< endl;
    for (size_t i = 0; i < userSpecialPtr.children.size(); i++) {
        if (userSpecialPtr.children[i].name == "Line") {
            // std::unique_ptr<IPCLine> line(new IPCLine(userSpecialPtr.children[i]));
            // lines.push_back(std::move(line));
            
            lines.push_back(new IPCLine(userSpecialPtr.children[i]));
        }
        else if (userSpecialPtr.children[i].name == "UserSpecial") {

            // std::unique_ptr<IPCUserSpecial> special(new IPCUserSpecial(userSpecialPtr.children[i]));
            // userSpecials.push_back(std::move(special));
            
            userSpecials.push_back(new IPCUserSpecial(userSpecialPtr.children[i]));
        }
        else if (userSpecialPtr.children[i].name == "Polyline") {

            // std::unique_ptr<IPCPolyline> polyline(new IPCPolyline(userSpecialPtr.children[i]));
            // polylines.push_back(std::move(polyline));

             polylines.push_back(new IPCPolyline(userSpecialPtr.children[i]));
        }
        else if (userSpecialPtr.children[i].name == "Circle") {
            circles.push_back(new Circle(userSpecialPtr.children[i]));
        }
    }
}

string IPCUserSpecial::toXML(int indent){
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<UserSpecial>\n";

    for(size_t i =0 ; i < lines.size(); i++){
        oss << lines[i]->toXML(indent + 4);
    }

    for(size_t i =0 ; i < circles.size(); i++){
        oss << circles[i]->toXML(indent + 4);
    }

    for(size_t i =0 ; i < userSpecials.size(); i++){
        oss << userSpecials[i]->toXML(indent + 4);
    }

    for(size_t i =0 ; i < polylines.size(); i++){
        oss << polylines[i]->toXML(indent + 4);
    }

    oss << tab << "</UserSpecial>\n";
    return oss.str();
}
void IPCUserSpecial::IPCUserSpecialDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent <<"UserSpecial [ "<< endl;
    for(size_t i =0 ; i < lines.size(); i++){
        lines[i]->IPCLineDisplay(depth + 1);
    }

    for(size_t i =0 ; i < userSpecials.size(); i++){
        userSpecials[i]->IPCUserSpecialDisplay(depth + 1);
    }

    for(size_t i =0 ; i < polylines.size(); i++){
        polylines[i]->IPCPolylineDisplay(depth + 1);
    }

    cout << indent <<"]"<<endl;
}



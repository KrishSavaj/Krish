#include <sstream>
#include "./include/ipc_package.h"
#include "./include/ipc_polygon.h"
#include "./include/ipc_marking.h"
#include "./include/ipc_pin.h"
#include "./include/ipc_assembly_drawing.h"
// #include "./include/ipc_silkscreen.h"
#include "./include/ipc_silkscreen.h"
#include "./include/ipc_pick_up_point.h"

using namespace std;



IPCPackage :: IPCPackage(TreeNode &packagePtr){
    // cout << "Hello Package ....."<<endl;
    packageName = packagePtr.attributes[0].second;
    type = packagePtr.attributes[1].second;
    pinOne = packagePtr.attributes[2].second;
    pinOneOrientation = packagePtr.attributes[3].second;

    
    
    
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    
    // addAttr("packageName", ValueType::STRING, &packageName, false, stc);
    // addAttr("type", ValueType::STRING, &type, false, stc);
    // addAttr("pinOne", ValueType::STRING, &pinOne, false, stc);
    // addAttr("pinOneOrientation", ValueType::STRING, &pinOneOrientation, false, stc);
    
    addOutline(packagePtr);
    addPickUpPoint(packagePtr);
    addSilkscreen(packagePtr);
    addAssemblyDrwaing(packagePtr);
    addPin(packagePtr);
}


void IPCPackage::addPolygon(TreeNode &packagePtr){

    for (size_t i = 0; i < packagePtr.children.size(); i++) {  
      
        if (packagePtr.children[i].name == "Polygon") {
           
            polygon = new IPCPolygon(packagePtr.children[i], 0.0, 0.0);

        }
        if(packagePtr.children[i].name == "LineDescRef"){
            // cout << "Adding Line" << packagePtr.children[i].name<< endl;
            LineDescRef = packagePtr.children[i].attributes[0].second;

        }
    }

}


void IPCPackage::addOutline(TreeNode &packagePtr){

    for (size_t i = 0; i < packagePtr.children.size(); i++) {
        // cout << "Adding outline: " << packagePtr.children[i].name<< endl; 
        
        if (packagePtr.children[i].name == "Outline") {
            //  cout << "Adding outline: " << packagePtr.children[i].name<< endl;
                outline = new IPCOutline(packagePtr.children[i]);
        }

    }

}



void IPCPackage::addPickUpPoint(TreeNode &packagePtr){

    for (size_t i = 0; i < packagePtr.children.size(); i++) {   
        if (packagePtr.children[i].name == "PickupPoint") {
              pickUpPoint = new IPCPickUpPoint(packagePtr.children[i]);
          }
    }

}



void IPCPackage::addAssemblyDrwaing(TreeNode &packagePtr){

    for (size_t i = 0; i < packagePtr.children.size(); i++) {   
        if (packagePtr.children[i].name == "AssemblyDrawing") {
              assemblyDrawing = new IPCAssemblyDrawing(packagePtr.children[i]);

        }
    }

}

void IPCPackage::addMarking(TreeNode &markingPtr) {
    for (size_t i = 0; i < markingPtr.children.size(); i++) {
        if (markingPtr.children[i].name == "Marking") {
            // cout << "Adding Marking: " << markingPtr.children[i].name << endl;
            marking = new IPCMarking(markingPtr.children[i]);

        }
    }
}
void IPCPackage::addSilkscreen(TreeNode &packagePtr){

    for (size_t i = 0; i < packagePtr.children.size(); i++) {   
        if (packagePtr.children[i].name == "SilkScreen") {
           silkscreen = new IPCSilkscreen(packagePtr.children[i]);
        }
    }

}

void IPCPackage :: addPin(TreeNode &packagePtr){

    for (size_t i = 0; i < packagePtr.children.size(); i++) {  
        
        
        if (packagePtr.children[i].name == "Pin") {
            //  cout << "Adding Pin: " << packagePtr.children[i].name<< endl;
                IPCpins.emplace_back(new IPCPin(packagePtr.children[i]));
        }
    }

}
void IPCPackage::IPCPackageDisplay(int depth) {
   
    string indent(depth * 4, ' ');
    cout << indent <<"Package [ ";
    cout << "Name: " << packageName;
    cout << "  Type: " << type;
    cout << "  PinOne: " << pinOne;
    cout << "  PinOneOrientation: " << pinOneOrientation; 
    cout << "]" <<endl;

    polygon->polygonDisplay(depth + 1);
    cout << indent << "LineDescRef: [id = " << LineDescRef <<"]"<< endl;
    marking->IPCMarkingDisplay(depth);
    // for(size_t i =0 ; i < IPCpins.size(); i++){
    //     IPCpins[i]->IPCPinDisplay(depth + 1);
    // }
    
    

}

string IPCPackage::toXML(int indent) {
    string indentStr(indent, ' ');
    ostringstream oss;

    oss << indentStr << "<Package name=\"" << packageName 
        << "\" type=\"" << type 
        << "\" pinOne=\"" << pinOne 
        << "\" pinOneOrientation=\"" << pinOneOrientation << "\">\n";
    // oss << polygon->toXML(indent + 4);
    // oss << marking->toXML(indent + 4);
    if (outline) {
        oss << outline->toXML(indent + 4);
    }
    if(pickUpPoint){
        oss << pickUpPoint->toXML(indent + 4);
    }   
    if(silkscreen){
        oss << silkscreen->toXML(indent + 4);
    }
    if (assemblyDrawing) {
        oss << assemblyDrawing->toXML(indent + 4);
    }
    for (const auto& pin : IPCpins) {
        oss << pin->toXML(indent + 4);
    }
    oss << indentStr << "</Package>\n";
    return oss.str();
}



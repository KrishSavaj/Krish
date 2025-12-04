#include <sstream>
#include "./include/ipc_layer.h"
#include <iostream>
#include <string>

using namespace std;

IPCLayer::IPCLayer(TreeNode &layerPtr) {
    // Assign values to class variables first
    layerName = layerPtr.attributes[0].second;
    layerFunction = layerPtr.attributes[1].second;
    polarity = layerPtr.attributes[2].second;
    side = layerPtr.attributes[3].second;

    // cout << "Layer name: " << layerName << endl;
    
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("layerName", ValueType::STRING, &layerName, false, stc);
    // addAttr("layerFunction", ValueType::STRING, &layerFunction, false, stc);
    // addAttr("polarity", ValueType::STRING, &polarity, false, stc);
    // addAttr("side", ValueType::STRING, &side, false, stc);
}


// FloatAttrConstraints *floatConst = new FloatAttrConstraints(FloatConstraintType::Unbounded);
// string xPosStr = to_string(xPosition);

void IPCLayer::IPCLayerDisplay(int depth) {
    string indent(depth * 3, ' ');
    cout << indent << "Layer Name: " << layerName;
    cout << indent << "Layer Function: " << layerFunction ;
    cout << indent << "Polarity: " << polarity;  
    cout << indent << "Side: " << side << endl;

    // getGUIstring();
}
string IPCLayer::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<Layer "
        << "name=\"" << layerName << "\" "
        << "layerFunction=\"" << layerFunction << "\" "
        << "polarity=\"" << polarity << "\" "
        << "side=\"" << side << "\"/>\n";
    
    // oss << tab << "</Layer>\n";

    return oss.str();
}








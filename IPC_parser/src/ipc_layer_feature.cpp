#include <sstream>
#include "./include/ipc_layer_feature.h"

using namespace std;

IPCLayerFeature ::IPCLayerFeature(TreeNode &layerPtr){
    layerRef = layerPtr.attributes[0].second;
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    // addAttr("layerRef", ValueType::STRING, &layerRef, false, stc);
    for(int i=0; i<layerPtr.children.size(); i++){
        if(layerPtr.children[i].name == "Set"){
            sets.push_back(new IPCSet(layerPtr.children[i]));
        }
     }

}

void IPCLayerFeature::IPCLayerFeatureDisplay(int depth) {
    // Destructor implementation (if needed)
        string indent(depth * 4, ' ');
        cout << indent << "LayerFeature: [ layerRef: " << layerRef << " ]"<<endl;

}
string IPCLayerFeature::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<LayerFeature layerRef=\"" << layerRef << "\">\n";
    for (size_t i = 0; i < sets.size(); i++) {
        oss << sets[i]->toXML(indent + 4);
    }
    oss << tab << "</LayerFeature>\n";

    return oss.str();
}
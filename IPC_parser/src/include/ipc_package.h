#ifndef IPC_PACKAGE
#define IPC_PACKAGE

// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include <string>
#include "tree_node.h"
#include "ipc_polygon.h"
#include "ipc_pin.h"
#include "ipc_marking.h"
#include "ipc_assembly_drawing.h"
#include "ipc_silkscreen.h"
#include "ipc_pick_up_point.h"
#include <vector>


class IPCPackage { // : public virtual GUIComponent
    private:
        std::string packageName;
        std::string type;
        std::string pinOne;
        std::string pinOneOrientation;
        IPCPolygon *polygon;
        IPCMarking *marking;
        std::vector<IPCPolygon*> polygons;
        std::vector<IPCPin*> IPCpins;
        IPCOutline *outline;
        IPCAssemblyDrawing *assemblyDrawing;
        IPCPickUpPoint *pickUpPoint;
        IPCSilkscreen *silkscreen;
        std::string LineDescRef;

    public:
        IPCPackage(TreeNode &packagePtr);
        void addOutline(TreeNode &packagePtr);
        void addPolygon(TreeNode &packagePtr);
        void addPickUpPoint(TreeNode &packagePtr);
        void addAssemblyDrwaing(TreeNode &packagePtr);
        void addMarking(TreeNode &packagePtr);
        void addSilkscreen(TreeNode &packagePtr);
        void addPin(TreeNode &packagePtr);
        void IPCPackageDisplay(int depth);
        std::string toXML(int indent);
        
};



#endif

#ifndef PCBCOMPONENT_H
#define PCBCOMPONENT_H

#include <iostream>
#include <string>
#include <vector>
#include <memory>
//#include <magic_enum/magic_enum.hpp>
#include "Pin.h"
#include "Geomclass.h"
#include "PCBObj.h"
//#include "TextLabel.h"
//#include "shapeFwd.h"

namespace PCBDesign {

class PCBComponent : public PCBObj {
public:
    // 1) Declare Property *first*
    struct Property {
        std::string key;
        std::string value;
        std::string layer;
        
        int      id    = -1;
        float    atX   = 0.0f;
        float    atY   = 0.0f;
        float    angle = 0.0f;
         // ← New fields:
        float    fontSizeX = 1.0f;
        float    fontSizeY = 1.0f;
        std::string justify = "left";
    };

    // === Constructors & destructor ===
    PCBComponent();
    PCBComponent(int id, const std::string& name);
    PCBComponent(int id,
                 const std::string& name,
                 const std::vector<Shape>& shapes,
                 const std::vector<Pin>& pins);
    virtual ~PCBComponent() = default;

    // === Property accessors ===
    void addProperty(const Property& p) {
        properties.push_back(p);
    }
    const std::vector<Property>& getProperties() const {
        return properties;
    }

    // === Label accessors ===
    // void addLabel(const TextLabel& lbl) { labels_.push_back(lbl); }
    // const std::vector<TextLabel>& getLabels() const { return labels_; }
    
    const std::string& getLibID() const { return libID; }
    float getX() const { return posX_; }
    float getY() const { return posY_; }

    bool hidePinNumbers_{false}, hidePinNames_{false};
    bool inBom_{false},       onBoard_{false};
    void setHidePinNumbers(bool v){ hidePinNumbers_ = v; }
    // === Getters & Setters ===
    int getId() const;
    const std::string& getName() const;
    void setId(int newId);
    void setName(const std::string& newName);

    std::vector<std::shared_ptr<Shape>> getShapes() const;
    //std::vector<Pin>                    getPins() const;

    void addShape(std::shared_ptr<Shape> newShape);
    void addPin(const Pin& newPin);
    void addSubcomponent(const std::shared_ptr<PCBComponent>& newComponent);
    void setHidePinNames  (bool v) { hidePinNames_   = v; }
    void setInBom         (bool v) { inBom_          = v; }
    void setOnBoard       (bool v) { onBoard_        = v; }
    void setExcludeFromSim(bool v) { excludeFromSim_ = v; }

    bool excludeFromSim_ = false;
  
    const std::vector<std::shared_ptr<PCBComponent>>& getSubcomponents() const {
        return subcomponents_;
}
    // === Display / Debug ===
    void display() const;
    void dump(std::ostream& out) const;

    // === Gerber extraction ===
    static std::vector<PCBComponent>
    extractComponentsFromGerber(const std::string& gerberFilePath);

    std::string extends_;
    void setExtends(const std::string &e) { extends_ = e; }
    const std::string& getExtends() const { return extends_; }
  // 1. position & rotation
    void setPosition(float x, float y);
    void setRotation(float angle);

    // 2. mirror
    void setMirrored(bool m);

    // 3. unit & DNP
    void setUnit(int unitNumber);
    void setDoNotPopulate(bool dnp);

    // 4. UUID
    void setUUID(const std::string& uuid);

    // 5. instances (optional storage strategy)
    void addInstancePosition(float x, float y);
    void addInstanceUUID(const std::string& uuid);
    void setLibID(const std::string& id) { libID = id; }
    void setReference(const std::string &r) { reference_ = r; }
    void setValue(const std::string &v)     { value_ = v; }
    const std::string& reference() const { return reference_; }
    const std::string& value() const     { return value_; }

    const std::vector<Pin>& getPins() const { return pins_; }
    const std::string& getRef() const { return reference_; }    


protected:
    int                                id_;
    std::string                        name_;
    std::vector<Pin>                   pins_;
    std::vector<std::shared_ptr<PCBComponent>> subcomponents_;
    //std::vector<TextLabel>             labels_;
    std::vector<std::shared_ptr<Shape>> shapes_;

    // 2) Now it's valid to use Property:
    std::vector<Property> properties;
    float posX_{0}, posY_{0};
    float rotation_{0};
    bool mirrored_{false};
    int unit_{1};
    bool doNotPopulate_{false};
    std::string uuid_;
    // optional vectors for instances:
    std::vector<std::pair<float,float>> instancePositions_;
    std::vector<std::string>            instanceUUIDs_;
    std::string libID;
    std::string reference_;
    std::string value_;
};

} // namespace PCBDesign

#endif // PCBCOMPONENT_H

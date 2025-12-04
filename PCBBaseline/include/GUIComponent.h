#ifndef GUI_COMPONENT_H
#define GUI_COMPONENT_H

#include <string>
#include <unordered_map>
#include <vector>
#include <functional>
#include <memory>
#include "attribute.h"  // keep your AttrConstraints, enums, etc.

// ========================================================
// Attribute Key (global ID + name)
// ========================================================
struct AttrKey {
    size_t id;
    std::string name;

    bool operator==(const AttrKey& o) const noexcept {
        return id == o.id && name == o.name;
    }
};

// Hash for AttrKey
namespace std {
template <>
struct hash<AttrKey> {
    std::size_t operator()(const AttrKey& k) const noexcept {
        return std::hash<size_t>{}(k.id) ^ (std::hash<std::string>{}(k.name) << 1);
    }
};
}

// ========================================================
// Attribute Entry (stored per-object)
// ========================================================
struct AttrEntry {
    ValueType type;
    bool is_optional{false};
    std::unique_ptr<AttrConstraints> constraint;
    std::function<std::string()> getter;
    std::function<bool(const std::string&, std::string&)> setter;
};

// ========================================================
// Global Registry Entry
// ========================================================
struct GlobalAttrEntry {
    std::function<bool(const std::string&, std::string&)> setter;
    std::function<std::string()> getter;
};

// ========================================================
// GUIComponent Base
// ========================================================
class GUIComponent {
protected:
    std::unordered_map<std::string, AttrEntry> attrs;
    
    // Static members for global attribute management
    static size_t globalAttrCounter;
    static std::unordered_map<AttrKey, GlobalAttrEntry> attrTable;

public:
    virtual ~GUIComponent() = default;

    // Register a new attribute
    void addAttr(const std::string& name,
                 ValueType type,
                 bool is_optional,
                 std::unique_ptr<AttrConstraints> constraint,
                 std::function<std::string()> getter,
                 std::function<bool(const std::string&, std::string&)> setter);

    // Set/Get
    bool setValue(const std::string& name, const std::string& guiValue, std::string& err);
    std::string getValue(const std::string& name) const;

    // GUI formatting
    std::string getGUIstring() const;
    
    // Get all attribute names
    std::vector<std::string> getAttributeNames() const;

    // Global interface
    static bool setByKey(const AttrKey& key, const std::string& val, std::string& err);
    static std::string getByKey(const AttrKey& key);
};

#endif

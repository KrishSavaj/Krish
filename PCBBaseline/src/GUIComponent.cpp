#include "GUIComponent.h"
#include <sstream>

// Static member definitions
size_t GUIComponent::globalAttrCounter = 0;
std::unordered_map<AttrKey, GlobalAttrEntry> GUIComponent::attrTable;

void GUIComponent::addAttr(const std::string& name,
                           ValueType type,
                           bool is_optional,
                           std::unique_ptr<AttrConstraints> constraint,
                           std::function<std::string()> getter,
                           std::function<bool(const std::string&, std::string&)> setter)
{
    AttrEntry entry;
    entry.type = type;
    entry.is_optional = is_optional;
    entry.constraint = std::move(constraint);
    entry.getter = std::move(getter);
    entry.setter = std::move(setter);

    attrs[name] = std::move(entry);

    ++globalAttrCounter;
    AttrKey key{ globalAttrCounter, name };

    // route global setter/getter via setValue/getValue
    attrTable[key] = {
        [this, name](const std::string& val, std::string& err) {
            return this->setValue(name, val, err);
        },
        [this, name]() {
            return this->getValue(name);
        }
    };
}

bool GUIComponent::setValue(const std::string& name,
                            const std::string& guiValue,
                            std::string& err)
{
    auto it = attrs.find(name);
    if (it == attrs.end()) {
        err = "No such attribute: " + name;
        return false;
    }

    AttrEntry& entry = it->second;

    // --- Check constraint ---
    if (entry.constraint && !entry.constraint->checkConstraints(guiValue)) {
        err = "Constraint failed for '" + name + "' with value: " + guiValue;
        return false;
    }

    // --- Execute setter ---
    if (!entry.setter) {
        err = "Setter missing for '" + name + "'";
        return false;
    }

    return entry.setter(guiValue, err);
}

std::string GUIComponent::getValue(const std::string& name) const {
    auto it = attrs.find(name);
    if (it == attrs.end() || !it->second.getter) return "";
    return it->second.getter();
}

std::string GUIComponent::getGUIstring() const {
    std::ostringstream oss;
    for (const auto& pair : attrs) {
        const std::string& name = pair.first;
        const AttrEntry& entry = pair.second;
        oss << name << "#" << (entry.getter ? entry.getter() : "") << "#TextBox;";
    }
    return oss.str();
}

std::vector<std::string> GUIComponent::getAttributeNames() const {
    std::vector<std::string> names;
    names.reserve(attrs.size());
    
    for (const auto& pair : attrs) {
        names.push_back(pair.first);
    }
    
    return names;
}

bool GUIComponent::setByKey(const AttrKey& key, const std::string& val, std::string& err) {
    auto it = attrTable.find(key);
    if (it == attrTable.end()) {
        err = "Attribute key not found.";
        return false;
    }
    return it->second.setter(val, err);
}

std::string GUIComponent::getByKey(const AttrKey& key) {
    auto it = attrTable.find(key);
    if (it == attrTable.end()) return "";
    return it->second.getter();
}

#include "../include/GUIComponentManager.h"
#include <algorithm>
#include <sstream>

namespace PCBDesign {

// Static member definitions
GUIComponentManager* GUIComponentManager::instance_ = nullptr;

GUIComponentManager::GUIComponentManager(ObjectID startID) 
    : nextAvailableID_(startID) {
}

GUIComponentManager& GUIComponentManager::getInstance() {
    if (!instance_) {
        instance_ = new GUIComponentManager();
    }
    
    return *instance_;
}

void GUIComponentManager::resetInstance() {
    delete instance_;
    instance_ = nullptr;
}

bool GUIComponentManager::addComponent(ObjectID id, std::unique_ptr<GUIComponent> component, const std::string& name) {
    if (!component) {
        return false;
    }
    
    // Check if ID already exists
    if (componentMap_.find(id) != componentMap_.end()) {
        return false;
    }
    
    // Add component and name
    componentMap_[id] = std::move(component);
    componentNames_[id] = name;
    
    triggerEvent(id, "added");
    return true;
}

ObjectID GUIComponentManager::addComponent(std::unique_ptr<GUIComponent> component, const std::string& name) {
    if (!component) {
        return -1;
    }
    
    ObjectID id = getNextAvailableID();
    if (addComponent(id, std::move(component), name)) {
        return id;
    }
    
    return -1;
}

bool GUIComponentManager::removeComponent(ObjectID id) {
    auto it = componentMap_.find(id);
    if (it == componentMap_.end()) {
        return false;
    }
    
    // Remove component and name
    componentMap_.erase(it);
    componentNames_.erase(id);
    
    triggerEvent(id, "removed");
    return true;
}

GUIComponent* GUIComponentManager::getComponent(ObjectID id) {
    auto it = componentMap_.find(id);
    if (it != componentMap_.end()) {
        return it->second.get();
    }
    return nullptr;
}

const GUIComponent* GUIComponentManager::getComponent(ObjectID id) const {
    auto it = componentMap_.find(id);
    if (it != componentMap_.end()) {
        return it->second.get();
    }
    return nullptr;
}

bool GUIComponentManager::hasComponent(ObjectID id) const {
    return componentMap_.find(id) != componentMap_.end();
}

std::string GUIComponentManager::getComponentName(ObjectID id) const {
    auto it = componentNames_.find(id);
    if (it != componentNames_.end()) {
        return it->second;
    }
    return "";
}

bool GUIComponentManager::setComponentName(ObjectID id, const std::string& name) {
    if (!hasComponent(id)) {
        return false;
    }
    
    componentNames_[id] = name;
    triggerEvent(id, "name_updated");
    return true;
}

std::vector<ObjectID> GUIComponentManager::getAllComponentIDs() const {
    std::vector<ObjectID> ids;
    ids.reserve(componentMap_.size());
    
    for (const auto& pair : componentMap_) {
        ids.push_back(pair.first);
    }
    
    return ids;
}

size_t GUIComponentManager::getComponentCount() const {
    return componentMap_.size();
}

void GUIComponentManager::clear() {
    // Trigger removal events for all components
    std::vector<ObjectID> ids = getAllComponentIDs();
    for (ObjectID id : ids) {
        triggerEvent(id, "cleared");
    }
    
    componentMap_.clear();
    componentNames_.clear();
}

bool GUIComponentManager::isEmpty() const {
    return componentMap_.empty();
}

void GUIComponentManager::setEventCallback(std::function<void(ObjectID, const std::string&)> callback) {
    eventCallback_ = callback;
}

std::vector<ObjectID> GUIComponentManager::findComponentsByName(const std::string& namePattern) const {
    std::vector<ObjectID> matchingIds;
    
    for (const auto& pair : componentNames_) {
        // Simple substring match (case-sensitive)
        if (pair.second.find(namePattern) != std::string::npos) {
            matchingIds.push_back(pair.first);
        }
    }
    
    return matchingIds;
}

std::map<ObjectID, std::string> GUIComponentManager::getAllGUIStrings() const {
    std::map<ObjectID, std::string> guiStrings;
    
    for (const auto& pair : componentMap_) {
        ObjectID id = pair.first;
        const GUIComponent* component = pair.second.get();
        
        if (component) {
            guiStrings[id] = component->getGUIstring();
        }
    }
    
    return guiStrings;
}

void GUIComponentManager::debugPrint() const {
    std::cout << "=== GUIComponentManager Debug Info ===" << std::endl;
    std::cout << "Total components: " << componentMap_.size() << std::endl;
    std::cout << "Next available ID: " << nextAvailableID_ << std::endl;
    
    for (const auto& pair : componentMap_) {
        ObjectID id = pair.first;
        const auto& component = pair.second;
        const std::string& name = componentNames_.at(id);
        
        std::cout << "\nComponent ID: " << id << " (Name: " << name << ")" << std::endl;
        std::cout << "GUI: " << component->getGUIstring() << std::endl;
        std::cout << "  GUI String: " << component->getGUIstring() << std::endl;
    }
    
    std::cout << "=== End Debug Info ===" << std::endl;
}

void GUIComponentManager::triggerEvent(ObjectID id, const std::string& event) {
    if (eventCallback_) {
        eventCallback_(id, event);
    }
}

ObjectID GUIComponentManager::getNextAvailableID() {
    // Find the next available ID that doesn't conflict with existing ones
    while (componentMap_.find(nextAvailableID_) != componentMap_.end()) {
        ++nextAvailableID_;
    }
    
    return nextAvailableID_++;
}

std::string GUIComponentManager::processGUIMessage(ObjectID objectId, const std::string& attributeName, 
                                                   bool isGetter, const std::string& value) {
    if (isGetter) {
        return getAttributeValue(objectId, attributeName);
    } else {
        bool success = setAttributeValue(objectId, attributeName, value);
        return success ? "true" : "false";
    }
}

std::string GUIComponentManager::getAttributeValue(ObjectID objectId, const std::string& attributeName) {
    GUIComponent* component = getComponent(objectId);
    if (!component) {
        return "";
    }
    
    return component->getValue(attributeName);
}

bool GUIComponentManager::setAttributeValue(ObjectID objectId, const std::string& attributeName, const std::string& value) {
    GUIComponent* component = getComponent(objectId);
    if (!component) {
        return false;
    }
    
    std::string err;
    bool success = component->setValue(attributeName, value, err);
    if (success) {
        triggerEvent(objectId, "attribute_updated: " + attributeName);
    }
    
    return success;
}

} // namespace PCBDesign

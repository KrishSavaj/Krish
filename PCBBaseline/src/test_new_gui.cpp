#include "../include/GUIComponentManager.h"
#include <iostream>
#include <memory>

using namespace PCBDesign;

// Helper function to create a test component with new GUIComponent API
std::unique_ptr<GUIComponent> createTestComponent(const std::string& componentName) {
    auto component = std::make_unique<GUIComponent>();
    
    // Use shared_ptr to ensure captured variables outlive the component
    auto name = std::make_shared<std::string>(componentName);
    auto x = std::make_shared<int>(100);
    auto y = std::make_shared<int>(200);
    auto visible = std::make_shared<bool>(true);
    
    // Name attribute
    component->addAttr("name", 
        ValueType::STRING,  // STRING from ValueType enum
        false,              // not optional
        nullptr,            // no constraint
        [name]() -> std::string { return *name; },
        [name](const std::string& value, std::string& err) -> bool { 
            *name = value; 
            return true; 
        });
    
    // X position attribute
    component->addAttr("x", 
        ValueType::INT,     // INT from ValueType enum
        false,              // not optional
        nullptr,            // no constraint
        [x]() -> std::string { return std::to_string(*x); },
        [x](const std::string& value, std::string& err) -> bool { 
            try {
                *x = std::stoi(value);
                return true;
            } catch (...) {
                err = "Invalid integer value";
                return false;
            }
        });
    
    // Y position attribute
    component->addAttr("y", 
        ValueType::INT,     // INT from ValueType enum
        false,
        nullptr,
        [y]() -> std::string { return std::to_string(*y); },
        [y](const std::string& value, std::string& err) -> bool { 
            try {
                *y = std::stoi(value);
                return true;
            } catch (...) {
                err = "Invalid integer value";
                return false;
            }
        });
    
    // Visible attribute
    component->addAttr("visible", 
        ValueType::BOOL,     // BOOL from ValueType enum
        false,
        nullptr,
        [visible]() -> std::string { return *visible ? "true" : "false"; },
        [visible](const std::string& value, std::string& err) -> bool { 
            if (value == "true") {
                *visible = true;
                return true;
            } else if (value == "false") {
                *visible = false;
                return true;
            }
            err = "Invalid boolean value, use 'true' or 'false'";
            return false;
        });
    
    return component;
}

int main() {
    std::cout << "=== GUIComponentManager with New GUIComponent API Test ===" << std::endl;
    
    // Get singleton instance
    GUIComponentManager& manager = GUIComponentManager::getInstance();
    
    // Set up event callback to track operations
    manager.setEventCallback([](ObjectID id, const std::string& event) {
        std::cout << "Event: Component " << id << " - " << event << std::endl;
    });
    
    // Test 1: Create and add components with new API
    std::cout << "\n--- Test 1: Adding components with new GUIComponent API ---" << std::endl;
    
    auto comp1 = createTestComponent("Button1");
    auto comp2 = createTestComponent("TextBox1");
    
    bool success1 = manager.addComponent(100, std::move(comp1), "ButtonComponent");
    bool success2 = manager.addComponent(200, std::move(comp2), "TextBoxComponent");
    
    std::cout << "Add component 100: " << (success1 ? "SUCCESS" : "FAILED") << std::endl;
    std::cout << "Add component 200: " << (success2 ? "SUCCESS" : "FAILED") << std::endl;
    
    // Test 2: GUI Message Processing - Get operations
    std::cout << "\n--- Test 2: GUI Message Processing - Get operations ---" << std::endl;
    
    std::string result1 = manager.processGUIMessage(100, "name", true);
    std::string result2 = manager.processGUIMessage(100, "x", true);
    std::string result3 = manager.processGUIMessage(100, "visible", true);
    std::string result4 = manager.processGUIMessage(999, "name", true); // Non-existent component
    
    std::cout << "Component 100 name: '" << result1 << "'" << std::endl;
    std::cout << "Component 100 x: '" << result2 << "'" << std::endl;
    std::cout << "Component 100 visible: '" << result3 << "'" << std::endl;
    std::cout << "Component 999 name: '" << result4 << "' (should be empty)" << std::endl;
    
    // Test 3: GUI Message Processing - Set operations
    std::cout << "\n--- Test 3: GUI Message Processing - Set operations ---" << std::endl;
    
    std::string setResult1 = manager.processGUIMessage(100, "name", false, "UpdatedButton");
    std::string setResult2 = manager.processGUIMessage(100, "x", false, "150");
    std::string setResult3 = manager.processGUIMessage(100, "visible", false, "false");
    std::string setResult4 = manager.processGUIMessage(100, "x", false, "invalid"); // Should fail
    std::string setResult5 = manager.processGUIMessage(999, "name", false, "Test"); // Non-existent component
    
    std::cout << "Set component 100 name: " << setResult1 << std::endl;
    std::cout << "Set component 100 x: " << setResult2 << std::endl;
    std::cout << "Set component 100 visible: " << setResult3 << std::endl;
    std::cout << "Set component 100 x (invalid): " << setResult4 << std::endl;
    std::cout << "Set component 999 name: " << setResult5 << std::endl;
    
    // Test 4: Verify changes
    std::cout << "\n--- Test 4: Verify changes after set operations ---" << std::endl;
    
    std::string newName = manager.processGUIMessage(100, "name", true);
    std::string newX = manager.processGUIMessage(100, "x", true);
    std::string newVisible = manager.processGUIMessage(100, "visible", true);
    
    std::cout << "Component 100 new name: '" << newName << "'" << std::endl;
    std::cout << "Component 100 new x: '" << newX << "'" << std::endl;
    std::cout << "Component 100 new visible: '" << newVisible << "'" << std::endl;
    
    // Test 5: GUI string generation
    std::cout << "\n--- Test 5: GUI string generation ---" << std::endl;
    
    auto guiStrings = manager.getAllGUIStrings();
    for (const auto& pair : guiStrings) {
        std::cout << "Component " << pair.first << " GUI: '" << pair.second << "'" << std::endl;
    }
    
    // Test 6: Component attribute names
    std::cout << "\n--- Test 6: Component attribute names ---" << std::endl;
    
    GUIComponent* comp = manager.getComponent(100);
    if (comp) {
        auto attrNames = comp->getAttributeNames();
        std::cout << "Component 100 attributes: ";
        for (const auto& name : attrNames) {
            std::cout << "'" << name << "' ";
        }
        std::cout << std::endl;
    }
    
    std::cout << "\n=== Test Complete ===" << std::endl;
    
    return 0;
}

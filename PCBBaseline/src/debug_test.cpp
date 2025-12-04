#include "../include/GUIComponentManager.h"
#include <iostream>
#include <memory>

using namespace PCBDesign;

int main() {
    std::cout << "=== Debug Test ===" << std::endl;
    
    // Get singleton instance
    GUIComponentManager& manager = GUIComponentManager::getInstance();
    
    // Create a simple component
    auto component = std::make_unique<GUIComponent>();
    
    // Add a simple attribute
    std::string testValue = "hello";
    component->addAttribute("test", 
        [&testValue]() -> std::string { 
            std::cout << "Getter called, returning: " << testValue << std::endl;
            return testValue; 
        },
        [&testValue](const std::string& value) -> bool { 
            std::cout << "Setter called with: " << value << std::endl;
            testValue = value; 
            return true; 
        });
    
    std::cout << "Adding component..." << std::endl;
    bool success = manager.addComponent(100, std::move(component), "TestComponent");
    std::cout << "Add result: " << success << std::endl;
    
    std::cout << "Getting attribute value..." << std::endl;
    std::string result = manager.getAttributeValue(100, "test");
    std::cout << "Get result: '" << result << "'" << std::endl;
    
    std::cout << "Setting attribute value..." << std::endl;
    bool setResult = manager.setAttributeValue(100, "test", "world");
    std::cout << "Set result: " << setResult << std::endl;
    
    std::cout << "Getting attribute value again..." << std::endl;
    std::string result2 = manager.getAttributeValue(100, "test");
    std::cout << "Get result 2: '" << result2 << "'" << std::endl;
    
    std::cout << "=== Debug Complete ===" << std::endl;
    return 0;
}

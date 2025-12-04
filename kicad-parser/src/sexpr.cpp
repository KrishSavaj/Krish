 

/******************************************************************************
 * Project: KiCAD S-Expression Parser
 * File:    sexpr.cpp
 * Author:  Check Authors.txt for authors
 * Date:    17th January 2025
 *
 * Description:
 *
 * License:
 * This software is proprietary and cannot be shared, reused, or distributed
 * without explicit permission from the author(s).
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES, OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 ******************************************************************************/
#include "sexpr.hpp"
#include "sexception.hpp"
#include <set>


namespace sexpr {

	Node::Node(NodeType type, size_t line_number) : 
		type_(type), line_number_(line_number) {}

	Node::Node(NodeType type) : 
		type_(type), line_number_(0) {}

	int64_t Node::GetLongInteger() const
	{
		if (type_ != NodeType::kInteger)
		{
			//update to add support for logging
			std::cout<<"Invalid type in integer\n";
		}
		return static_cast<const NodeInteger *>(this)->value;
	}

	int32_t Node::GetInteger() const
	{
		return static_cast<int32_t>(GetLongInteger());
	}

	double Node::GetDouble() const
	{
		if (type_ != NodeType::kDouble)
		{
			//update to add support for logging code
			std::cout<<"Invalid type in double\n";
		}
		return static_cast<const NodeDouble *>(this)->value;
	}

	float Node::GetFloat() const
	{
		return static_cast<float>(GetDouble());
	}

	const std::string &Node::GetString() const
	{
		if (type_ != NodeType::kString)
		{
			//update to add support for logging
			std::cout<<"Invalid type in string\n";
		}
		return static_cast<const NodeString *>(this)->value;
	}

	const std::string &Node::GetSymbol() const
	{
		if (type_ != NodeType::kSymbol)
		{
			// throw InvalidTypeException("Invalid type");
			//update to add support for logging
			std::cout<<"Invalid type in symbol\n";
		}
		return static_cast<const NodeSymbol *>(this)->value;
	}

	const NodeVector* Node::GetChildren() const
	{
		if (type_ != NodeType::kList)
		{
			// throw InvalidTypeException("Invalid type");
			//update to add support for logging
			std::cout<<"Invalid type in list\n";
		}
		return &static_cast<const NodeList *>(this)->children;
	}

	Node* Node::GetChild(size_t index) const
	{
		if (type_ != NodeType::kList)
		{
			// throw InvalidTypeException("Invalid type");
			//update to add support for logging
			std::cout<<"Invalid type in list\n";
		}
		return static_cast<const NodeList *>(this)->children.at(index);
	}

	Node* Node::GetParent() const
	{
		return parent;
	}

	size_t Node::GetNumberOfChildren() const
	{
		if (type_ != NodeType::kList)
		{
			// throw InvalidTypeException("Invalid type");
			//update to add support for logging
			std::cout<<"Invalid type in list\n";
		}
		return static_cast<const NodeList *>(this)->children.size();
	}

	NodeVector* Node::GetList()
	{
		if (type_ != NodeType::kList)
		{
			// throw InvalidTypeException("Invalid type");
			//update to add support for logging
			std::cout<<"Invalid type in list\n";
		}
		return &static_cast<NodeList *>(this)->children;
	}

	void Node::AddChild(Node* child)
	{
		if (type_ != NodeType::kList)
		{
			// throw InvalidTypeException("Invalid type");
			//update to add support for logging
			std::cout<<"Invalid type in list\n";
		}
		static_cast<NodeList *>(this)->children.push_back(child);
		child->SetParent(this);
	}

	void Node::SetParent(Node * parent)
	{
		this->parent = parent;
	}

	std::string Node::AsString(size_t level) const {
		std::string result;
		switch (type_) {
			case NodeType::kInteger: 	
				result = std::to_string(GetLongInteger());
				break;
			case NodeType::kDouble:
				result = std::to_string(GetDouble());
				break;
			case NodeType::kString:
				result = GetString();
				break;
			case NodeType::kSymbol:
				result = GetSymbol();
				break;
			case NodeType::kList:
				result = "(";
				for (size_t i = 0; i < GetNumberOfChildren(); ++i) {
					result += GetChild(i)->AsString(level + 1);
					if (i < GetNumberOfChildren() - 1) {
						result += " ";
					}
				}
				result += ")";
				break;
			default:
				// throw InvalidTypeException("Invalid type");
				//update to add support for logging
				std::cout<<"Invalid type\n";
		}
		return result;
	}

	NodeList::~NodeList()
	{
		for (Node* child : children) {
			delete child;
		}
	}

	std::string Node::GetTypeName() const
	{
		switch (type_)
		{
			case NodeType::kInteger:
				return "Integer";
			case NodeType::kDouble:
				return "Double";
			case NodeType::kString:
				return "String";
			case NodeType::kSymbol:
				return "Symbol";
			case NodeType::kList:
				return "List";
			default:
				return "Unknown";
		}
	}

}  // namespace sexpr

KiCadFileType GetFileExtension(const char *file_name)
{
	const char *dot_position = strrchr(file_name, '.');
	if (!dot_position || dot_position == file_name)
	{
		return KiCadFileType::kInvalid;
	}

	std::string extension(dot_position + 1);
	if (extension == "kicad_pcb")
	{
		return KiCadFileType::kBoard;
	}
	else if (extension == "kicad_sym")
	{
		return KiCadFileType::kSym;
	}
	else if (extension == "kicad_sch")
	{
		return KiCadFileType::kSchema;
	}
	else if (extension == "kicad_mod") {
        return KiCadFileType::kModule;
    }
	else
	{
		return KiCadFileType::kInvalid;
	}
}

bool IsFileValid(const char *file_name)
{
	return GetFileExtension(file_name) != KiCadFileType::kInvalid;
}
void PrintUnhandledNodes(const sexpr::Node* node, int depth){
	  std::cout << std::string(depth * 2, ' ') << "[Debug] Visiting node\n";
    if (auto list = dynamic_cast<const sexpr::NodeList*>(node)) {
        if (!list->children.empty()) {
            const sexpr::Node* head = list->children[0];
            if (auto headSym = dynamic_cast<const sexpr::NodeSymbol*>(head)) {
                std::string keyword = headSym->value;
                static std::set<std::string> handled = {
                    "symbol", "property", "pin", "graphic",
                    "rectangle", "line", "arc", "polyline",
                    "circle", "text", "uuid", "lib_id", "subcomponents"
                };
                if (handled.find(keyword) == handled.end()) {
                    std::cout << std::string(depth * 2, ' ')
                              << "  Unhandled symbol: " << keyword << "\n";
                }
            }
        }

        // Recurse into children
        for (const auto& child : list->children) {
            PrintUnhandledNodes(child, depth + 1);
        }
    }
}

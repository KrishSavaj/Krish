/******************************************************************************
 * Project: KiCAD S-Expression Parser
 * File:    sexpr.hpp
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
#ifndef SEXPR_HPP_
#define SEXPR_HPP_

#include <iostream>
#include <cstring>
#include <cstdint>
#include <string>
#include <vector>
#include <memory>
#include <sexception.hpp>

namespace sexpr {

    using std::int32_t;
    using std::int64_t;

    enum class NodeType : char
    {
        kList,
        kInteger,
        kDouble,
        kString,
        kSymbol,
        kModule,
    };

    using NodeVector = std::vector<class Node*>;

    class Node
    {
    public:
        virtual ~Node() = default;

        bool IsList() const { return type_ == NodeType::kList; }
        bool IsSymbol() const { return type_ == NodeType::kSymbol; }
        bool IsString() const { return type_ == NodeType::kString; }
        bool IsDouble() const { return type_ == NodeType::kDouble; }
        bool IsInteger() const { return type_ == NodeType::kInteger; }

        std::string GetTypeName() const;
        void AddChild(Node* child);
        void SetParent(Node* parent);
        const NodeVector* GetChildren() const;
        Node* GetParent() const;
        Node* GetChild(size_t index) const;
        size_t GetNumberOfChildren() const;
        int64_t GetLongInteger() const;
        int32_t GetInteger() const;
        float GetFloat() const;
        double GetDouble() const;
        const std::string &GetString() const;
        const std::string &GetSymbol() const;
        NodeVector* GetList();
        std::string AsString(size_t level = 0) const;
        size_t GetLineNumber() const { return line_number_; }

    protected:
        NodeType type_;
        size_t line_number_;
        Node* parent;

        Node(NodeType type, size_t line_number);
        explicit Node(NodeType type);
    };

    class NodeInteger : public Node
    {
    public:
        int64_t value;

        NodeInteger(int64_t value, size_t line_number)
            : Node(NodeType::kInteger, line_number), value(value) {};

        NodeInteger(int64_t value) : Node(NodeType::kInteger), value(value) {};

        int64_t GetValue() const { return value; }
    };

    class NodeDouble : public Node
    {
    public:
        double value;

        NodeDouble(double value, size_t line_number)
            : Node(NodeType::kDouble, line_number), value(value) {};

        NodeDouble(double value) : Node(NodeType::kDouble), value(value) {};

        double GetValue() const { return value; }
    };

    class NodeString : public Node
    {
    public:
        std::string value;

        NodeString(const std::string &value, size_t line_number)
            : Node(NodeType::kString, line_number), value(value) {};
        
        NodeString(const std::string &value) : Node(NodeType::kString), value(value) {};

        const std::string &GetValue() const { return value; }
    };

    class NodeSymbol : public Node
    {
    public:
        std::string value;

        NodeSymbol(const std::string &value, size_t line_number)
            : Node(NodeType::kSymbol, line_number), value(value) {};
        
        NodeSymbol(const std::string &value) : Node(NodeType::kSymbol), value(value) {};

        const std::string &GetValue() const { return value; }
    };

    class NodeList : public Node
    {
    public:
        NodeVector children;

        NodeList(size_t line_number) : Node(NodeType::kList, line_number) {};
        NodeList() : Node(NodeType::kList) {};

        ~NodeList() override;
    };

}  // namespace sexpr

// Define the file types
enum class KiCadFileType {
  kInvalid,  // Represents an invalid file
  kSym,      // Represents a KiCad symbol file
  kSchema,   // Represents a KiCad schematic file
  kBoard,     // Represents a KiCad PCB board file
  kModule
};

KiCadFileType GetFileExtension(const char* file_name);
bool IsFileValid(const char* file_name);
// Declaration for printing unhandled nodes in the AST
void PrintUnhandledNodes(const sexpr::Node* node, int depth = 0);

#endif  // SEXPR_HPP_

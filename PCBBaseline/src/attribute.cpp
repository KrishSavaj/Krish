#include "../include/attribute.h"
#include <stdexcept>
#include <iostream>
#include <sstream>
#include <cstdio>

using namespace std;

// =============================================
//  INT ATTR CONSTRAINTS IMPLEMENTATION
// =============================================
IntAttrConstraints::IntAttrConstraints(IntegerConstraintType t, pair<int, int> r)
    : type(t), range(r)
{
}

bool IntAttrConstraints::checkConstraints(const string &value)
{
    try
    {
        int valInt = stoi(value);
        return checkConstraints(valInt);
    }
    catch (...)
    {
        return false;
    }
}

bool IntAttrConstraints::checkConstraints(int val)
{
    switch (type)
    {
    case IntegerConstraintType::Positive:
        return (val > 0);
    case IntegerConstraintType::NonNegative:
        return (val >= 0);
    case IntegerConstraintType::InRange:
        return (val >= range.first && val <= range.second);
    case IntegerConstraintType::Unconstrained:
        return true;
    }
    return false; // fallback
}

string IntAttrConstraints::toString()
{
    switch (type)
    {
    case IntegerConstraintType::Positive:
        return "Integer: Positive";
    case IntegerConstraintType::NonNegative:
        return "Integer: NonNegative";
    case IntegerConstraintType::InRange:
    {
        ostringstream oss;
        oss << "Integer: InRange [" << range.first << ", " << range.second << "]";
        return oss.str();
    }
    case IntegerConstraintType::Unconstrained:
        return "Integer: Unconstrained";
    }
    return "Integer: (Unknown)";
}

// =============================================
//  FLOAT ATTR CONSTRAINTS IMPLEMENTATION
// =============================================
FloatAttrConstraints::FloatAttrConstraints(FloatConstraintType t, pair<float, float> r)
    : type(t), range(r)
{
}

bool FloatAttrConstraints::checkConstraints(const string &value)
{
    try
    {
        float valF = stof(value);
        return checkConstraints(valF);
    }
    catch (...)
    {
        return false;
    }
}

bool FloatAttrConstraints::checkConstraints(float val)
{
    switch (type)
    {
    case FloatConstraintType::Positive:
        return (val > 0);
    case FloatConstraintType::NonNegative:
        return (val >= 0);
    case FloatConstraintType::InRange:
        return (val >= range.first && val <= range.second);
    case FloatConstraintType::Unbounded:
        return true;
    }
    return false;
}

string FloatAttrConstraints::toString()
{
    switch (type)
    {
    case FloatConstraintType::Positive:
        return "Float: Positive";
    case FloatConstraintType::NonNegative:
        return "Float: NonNegative";
    case FloatConstraintType::InRange:
    {
        ostringstream oss;
        oss << "Float: InRange [" << range.first << ", " << range.second << "]";
        return oss.str();
    }
    case FloatConstraintType::Unbounded:
        return "Float: Unbounded";
    }
    return "Float: (Unknown)";
}

// =============================================
//  DOUBLE ATTR CONSTRAINTS IMPLEMENTATION
// =============================================
DoubleAttrConstraints::DoubleAttrConstraints(DoubleConstraintType t, pair<double, double> r)
    : type(t), range(r)
{
}

bool DoubleAttrConstraints::checkConstraints(const string &value)
{
    try
    {
        double valD = stod(value);
        return checkConstraints(valD);
    }
    catch (...)
    {
        return false;
    }
}

bool DoubleAttrConstraints::checkConstraints(double val)
{
    switch (type)
    {
    case DoubleConstraintType::Positive:
        return (val > 0);
    case DoubleConstraintType::NonNegative:
        return (val >= 0);
    case DoubleConstraintType::InRange:
        return (val >= range.first && val <= range.second);
    case DoubleConstraintType::Unbounded:
        return true;
    }
    return false;
}

string DoubleAttrConstraints::toString()
{
    switch (type)
    {
    case DoubleConstraintType::Positive:
        return "Double: Positive";
    case DoubleConstraintType::NonNegative:
        return "Double: NonNegative";
    case DoubleConstraintType::InRange:
    {
        ostringstream oss;
        oss << "Double: InRange [" << range.first << ", " << range.second << "]";
        return oss.str();
    }
    case DoubleConstraintType::Unbounded:
        return "Double: Unbounded";
    }
    return "Double: (Unknown)";
}

// =============================================
//  STRING ATTR CONSTRAINTS IMPLEMENTATION
// =============================================
StringAttrConstraints::StringAttrConstraints(StringConstraintType t, pair<int, int> r)
    : type(t), lengthRange(r)
{
}

bool StringAttrConstraints::checkConstraints(const string &value)
{
    switch (type)
    {
    case StringConstraintType::NonEmpty:
        return !value.empty();
    case StringConstraintType::InLengthRange:
    {
        size_t len = value.size();
        return (static_cast<int>(len) >= lengthRange.first &&
                static_cast<int>(len) <= lengthRange.second);
    }
    case StringConstraintType::Unconstrained:
        return true;
    }
    return false;
}

string StringAttrConstraints::toString()
{
    switch (type)
    {
    case StringConstraintType::NonEmpty:
        return "String: NonEmpty";
    case StringConstraintType::InLengthRange:
    {
        ostringstream oss;
        oss << "String: InLengthRange [" << lengthRange.first << ", " << lengthRange.second << "]";
        return oss.str();
    }
    case StringConstraintType::Unconstrained:
        return "String: Unconstrained";
    }
    return "String: (Unknown)";
}

// =============================================
//  TUPLE ATTR CONSTRAINTS IMPLEMENTATION
// =============================================
TupleAttrConstraints::TupleAttrConstraints(pair<float, float> minV, pair<float, float> maxV)
    : minValues(minV), maxValues(maxV)
{
}

bool TupleAttrConstraints::checkConstraints(const string &value)
{
    float a, b;
    if (sscanf(value.c_str(), "(%f,%f)", &a, &b) == 2 ||
        sscanf(value.c_str(), "(%f, %f)", &a, &b) == 2)
    {
        return checkTuplePair({a, b});
    }
    return false;
}

bool TupleAttrConstraints::checkTuplePair(const pair<float, float> &val)
{
    return (val.first >= minValues.first && val.first <= maxValues.first) &&
           (val.second >= minValues.second && val.second <= maxValues.second);
}

string TupleAttrConstraints::toString()
{
    ostringstream oss;
    oss << "Tuple: [(" << minValues.first << ", " << minValues.second
        << ") - (" << maxValues.first << ", " << maxValues.second << ")]";
    return oss.str();
}

// =============================================
//  ATTRIBUTE_VALUE IMPLEMENTATION
// =============================================
// NOTE: We're now assuming that rawValue is a pointer to a string.
Attribute_value::Attribute_value(ValueType t, void *rawValue, AttrConstraints *c)
    : constraint(c), current_type(t), isStringConstructed(false)
{
    // Removed the erroneous dereference; pass rawValue directly.
    setValue(t, rawValue);
}

Attribute_value::~Attribute_value()
{
    if (current_type == ValueType::STRING && isStringConstructed)
    {
        val.s.~basic_string();
    }
}

// added cases to handle rawValue as int*, float*, double*, and bool*.
void Attribute_value::setValue(ValueType t, void *rawValue)
{
    current_type = t;
    try
    {
        switch (t)
        {
        case ValueType::INT:
        {
            // Interpret rawValue as int*
            int *intPtr = static_cast<int *>(rawValue);
            std::string strValue = std::to_string(*intPtr);
            if (constraint && !constraint->checkConstraints(strValue))
            {
                std::cerr << "Constraint failed for value: " << strValue << std::endl;
                return;
            }
            val.x = *intPtr;
            break;
        }
        case ValueType::FLOAT:
        {
            float *fPtr = static_cast<float *>(rawValue);
            std::string strValue = std::to_string(*fPtr);
            if (constraint && !constraint->checkConstraints(strValue))
            {
                std::cerr << "Constraint failed for value: " << strValue << std::endl;
                return;
            }
            val.y = *fPtr;
            break;
        }
        case ValueType::DOUBLE:
        {
            double *dPtr = static_cast<double *>(rawValue);
            std::string strValue = std::to_string(*dPtr);
            if (constraint && !constraint->checkConstraints(strValue))
            {
                std::cerr << "Constraint failed for value: " << strValue << std::endl;
                return;
            }
            val.z = *dPtr;
            break;
        }
        case ValueType::BOOL:
        {
            // Here, you might decide on a representation.
            // For example, you could cast rawValue to a bool* if you pass that.
            bool *bPtr = static_cast<bool *>(rawValue);
            val.b = *bPtr;
            break;
        }
        case ValueType::STRING:
        {
            // Interpret rawValue as string*
            string *strPtr = static_cast<string *>(rawValue);
            if (constraint && !constraint->checkConstraints(*strPtr))
            {
                std::cerr << "Constraint failed for value: " << *strPtr << std::endl;
                return;
            }
            new (&val.s) std::string(*strPtr);
            isStringConstructed = true;
            break;
        }
        case ValueType::TUPLE:
        {
            // Interpret rawValue as string* and parse tuple values
            string *strPtr = static_cast<string *>(rawValue);
            float a = 0.f, b = 0.f;
            if (sscanf(strPtr->c_str(), "(%f,%f)", &a, &b) != 2 &&
                sscanf(strPtr->c_str(), "(%f, %f)", &a, &b) != 2)
            {
                std::cerr << "Tuple parsing failed for value: " << *strPtr << std::endl;
                val.p = {0.f, 0.f};
            }
            else
            {
                val.p = {a, b};
            }
            break;
        }
        }
    }
    catch (...)
    {
        std::cerr << "Error processing value in setValue" << std::endl;
    }
}

string Attribute_value::get_value() const
{
    switch (current_type)
    {
    case ValueType::INT:
        return to_string(val.x);
    case ValueType::FLOAT:
        return to_string(val.y);
    case ValueType::DOUBLE:
        return to_string(val.z);
    case ValueType::BOOL:
        return val.b ? "true" : "false";
    case ValueType::STRING:
        return val.s;
    case ValueType::TUPLE:
    {
        ostringstream oss;
        oss << "(" << val.p.first << ", " << val.p.second << ")";
        return oss.str();
    }
    }
    return "";
}

// =============================================
//  ATTRIBUTE IMPLEMENTATION
// =============================================
// Using void* rawValue for generic GUI string input.
Attribute::Attribute(const string &n, ValueType t, void *rawValue, bool is_opt, AttrConstraints *constraints)
    : name(n), is_optional(is_opt)
{
    if (t == ValueType::STRING)
    {
        string_storage = *static_cast<const string *>(rawValue);
        rawValue = &string_storage;
    } // did this so the we don't use temporary string object
    attribute_info = (constraints ? constraints->toString() : "");
    attribute_value = std::make_unique<Attribute_value>(t, rawValue, constraints);
}

string Attribute::get_name() const
{
    return name;
}

string Attribute::get_value() const
{
    return attribute_value ? attribute_value->get_value() : "";
}

string Attribute::get_attribute_info() const
{
    return attribute_info;
}

bool Attribute::get_is_optional() const
{
    return is_optional;
}

void Attribute::set_name(const string &n)
{
    name = n;
}

void Attribute::set_value(ValueType t, void *rawValue)
{
    if (attribute_value)
    {
        attribute_value->setValue(t, rawValue);
    }
}

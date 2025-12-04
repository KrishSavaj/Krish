#ifndef ATTRIBUTE_H
#define ATTRIBUTE_H

#include <iostream>
#include <string>
#include <limits>
#include <utility>
#include <cstdio>
#include <sstream>
#include <memory> // For std::unique_ptr

// === BASE CONSTRAINT CLASS ===
class AttrConstraints
{
public:
    virtual bool checkConstraints(const std::string &value) = 0;
    virtual std::string toString() = 0;
    virtual ~AttrConstraints() {}
};

// === INTEGER CONSTRAINTS ===
enum class IntegerConstraintType
{
    Positive,
    NonNegative,
    InRange,
    Unconstrained
};

class IntAttrConstraints : public AttrConstraints
{
public:
    IntegerConstraintType type;
    std::pair<int, int> range;

    IntAttrConstraints(IntegerConstraintType t, std::pair<int, int> r = {0, 0});

    bool checkConstraints(const std::string &value) override;
    bool checkConstraints(int val);
    std::string toString() override;
};

// === FLOAT CONSTRAINTS ===
enum class FloatConstraintType
{
    Positive,
    NonNegative,
    InRange,
    Unbounded
};

class FloatAttrConstraints : public AttrConstraints
{
public:
    FloatConstraintType type;
    std::pair<float, float> range;

    FloatAttrConstraints(FloatConstraintType t, std::pair<float, float> r = {0.f, 0.f});

    bool checkConstraints(const std::string &value) override;
    bool checkConstraints(float val);
    std::string toString() override;
};

// === DOUBLE CONSTRAINTS ===
enum class DoubleConstraintType
{
    Positive,
    NonNegative,
    InRange,
    Unbounded
};

class DoubleAttrConstraints : public AttrConstraints
{
public:
    DoubleConstraintType type;
    std::pair<double, double> range;

    DoubleAttrConstraints(DoubleConstraintType t, std::pair<double, double> r = {0.0, 0.0});

    bool checkConstraints(const std::string &value) override;
    bool checkConstraints(double val);
    std::string toString() override;
};

// === STRING CONSTRAINTS ===
enum class StringConstraintType
{
    NonEmpty,
    InLengthRange,
    Unconstrained
};

class StringAttrConstraints : public AttrConstraints
{
public:
    StringConstraintType type;
    std::pair<int, int> lengthRange;

    StringAttrConstraints(StringConstraintType t, std::pair<int, int> r = {0, 0});

    bool checkConstraints(const std::string &value) override;
    std::string toString() override;
};

// === TUPLE CONSTRAINTS ===
class TupleAttrConstraints : public AttrConstraints
{
public:
    std::pair<float, float> minValues;
    std::pair<float, float> maxValues;

    TupleAttrConstraints(
        std::pair<float, float> minV = {
            -std::numeric_limits<float>::infinity(),
            -std::numeric_limits<float>::infinity()},
        std::pair<float, float> maxV = {std::numeric_limits<float>::infinity(), std::numeric_limits<float>::infinity()});

    bool checkConstraints(const std::string &value) override;
    bool checkTuplePair(const std::pair<float, float> &val);
    std::string toString() override;
};

// === VALUE TYPE ENUM ===
enum class ValueType
{
    INT,
    FLOAT,
    DOUBLE,
    BOOL,
    STRING,
    TUPLE
};

// === ATTRIBUTE_VALUE CLASS ===
// This class uses a union to store one of several types.
// Since unions do not automatically call destructors for non-trivial types,
// we manually manage the lifetime of the std::string.
class Attribute_value
{
private:
    AttrConstraints *constraint;
    ValueType current_type;
    bool isStringConstructed; // Flag to track if std::string was constructed
public:
    union unionVal
    {
        int x;
        float y;
        double z;
        bool b;
        std::string s;
        std::pair<float, float> p;
        unionVal() {}
        ~unionVal() {}
    } val;

    Attribute_value(ValueType t, void *rawValue, AttrConstraints *c = nullptr);
    ~Attribute_value();

    std::string get_value() const;
    void setValue(ValueType t, void *rawValue);
};

// === ATTRIBUTE CLASS ===
// Uses std::unique_ptr to manage Attribute_value memory automatically.
class Attribute
{
private:
    std::string name;
    bool is_optional;
    std::string attribute_info;
    std::unique_ptr<Attribute_value> attribute_value;
    std::string string_storage;

public:
    Attribute(const std::string &name,
              ValueType t,
              void *rawValue,
              bool is_opt,
              AttrConstraints *constraints = nullptr);
    ~Attribute() = default; // Memory is managed by unique_ptr

    std::string get_name() const;
    std::string get_value() const;
    std::string get_attribute_info() const;
    bool get_is_optional() const;

    void set_name(const std::string &n);
    void set_value(ValueType t, void *rawValue);
};

#endif // ATTRIBUTE_H

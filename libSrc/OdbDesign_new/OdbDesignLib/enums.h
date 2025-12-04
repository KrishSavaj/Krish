#pragma once

namespace Odb::Lib
{
	enum class BoardSide
	{
		BsNone,
		Top,
		Bottom
	};

	enum class LineShape
	{
		Square,
		Round
	};

	enum class Polarity
	{
		POSITIVE, // done in order to mactch standard format, made small letter to capitalize later
		NEGATIVE
	};

	enum class UnitType
	{
		None,
		Metric,
		Imperial
	};

	enum class DesignType
	{
		FileArchive,
		Design
	};
}

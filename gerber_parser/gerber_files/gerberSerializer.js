
export function serializeToGerber(shapes) {
    const header = [
      '%FSLAX24Y24*%', // 2 integer, 4 decimal
      '%MOMM*%'        // millimeter units
    ];
  
    const formatCoord = val => String(Math.round(val * 10000)).padStart(6, '0');
  
    const body = shapes.flatMap(shape => {
      if (!Array.isArray(shape.points) || shape.points.length < 2) return [];
  
      return shape.points.map(([x, y], index) => {
        const X = formatCoord(x);
        const Y = formatCoord(y);
        return index === 0
          ? `G01X${X}Y${Y}D02*`  // Move
          : `X${X}Y${Y}D01*`;    // Draw
      });
    });
  
    const footer = ['M02*'];
  
    return [...header, ...body, ...footer].join('\r\n');
  }
  
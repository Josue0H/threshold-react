export const thresholdPlugin = {
    id: 'thresholdPlugin',
    afterRender: function(chart, easing) {
        const ctx = chart.ctx;
        const threshold = chart.options.thresholdPlugin.threshold;
        const line1xy = chart._metasets[0]._parsed;        
        const line1coords = chart._metasets[0].data;   
        var thresholdYCoords = chart.scales.y.getPixelForValue(threshold);     

        const zero = {x: chart.scales.x.getPixelForValue(0), y: chart.scales.y.getPixelForValue(0)};
        const end = {x: chart.scales.x.getPixelForValue(9), y: chart.scales.y.getPixelForValue(9)};

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(zero.x, zero.y);

        // Draw line from first point to threshold or to the point if it's above the threshold
        ctx.lineTo(zero.x, threshold <= line1xy[0].y ? thresholdYCoords : line1coords[0].y);

        for (let i = 1; i < line1xy.length; i++) {
            const prevPoint = line1xy[i - 1];
            const prevPointCoords = line1coords[i - 1];
            const currentPointCoords = line1coords[i];

            if (prevPoint.y >= threshold && line1xy[i].y >= threshold) {
                // When both points are above the threshold, draw a line to the threshold
                ctx.lineTo(currentPointCoords.x, thresholdYCoords);
            } else if (prevPoint.y < threshold && line1xy[i].y < threshold) {
                // When both points are below the threshold, draw a line to the point
                ctx.lineTo(currentPointCoords.x, currentPointCoords.y);
            } else {
                // When one point is above and the other is below the threshold, calculate the intersection
                const intersection = calculateIntersection(
                    [prevPointCoords.x, prevPointCoords.y, currentPointCoords.x, currentPointCoords.y],
                    [prevPointCoords.x, thresholdYCoords, currentPointCoords.x, thresholdYCoords]
                );
                if (intersection) {
                    // Draw lines to the intersection and then to the threshold
                    ctx.lineTo(intersection.x, intersection.y); 
                    ctx.lineTo(currentPointCoords.x, line1xy[i].y > threshold ? thresholdYCoords : currentPointCoords.y);
                }
            }
        }
        
        ctx.lineTo(end.x, threshold <= line1xy[line1xy.length - 1].y ? thresholdYCoords : line1coords[line1coords.length - 1].y);
        ctx.lineTo(end.x, zero.y);
        ctx.lineTo(zero.x, zero.y);

        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fill(); 
        ctx.closePath();
        ctx.restore();


      }
  };


  const calculateIntersection = (line1, line2) => {
    const x1 = line1[0];
    const y1 = line1[1];
    const x2 = line1[2];
    const y2 = line1[3];
    const x3 = line2[0];
    const y3 = line2[1];
    const x4 = line2[2];
    const y4 = line2[3];
  
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  
    if (denominator === 0) {
      return null;
    }
  
    const x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denominator;
    const y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator;
  
    return { x, y };
  };
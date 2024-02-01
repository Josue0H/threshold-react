import { scales } from 'chart.js';
import React from 'react'
import { Line } from 'react-chartjs-2';

const LineChart = ({ data, threshold }) => {

  return (
      <Line
        data={data}
        className="line-chart"
        plugins={['thresholdPlugin']}
        options={
            {
                scales: {
                    y: {
                        min: 0,
                        max: 10
                    },
                    x: {
                        min: 0,
                        max: 10
                    }
                },
                thresholdPlugin: {
                    threshold: threshold
                }
            }
        }
      />
  )
}

export default LineChart;

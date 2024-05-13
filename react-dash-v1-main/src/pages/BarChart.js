import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ salaire }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const data = {
      labels: [
        salaire.dateemb, // Add dateemb to labels
        ...salaire.salaires.map((s) => s.change_date)
      ],
      datasets: [
        {
          label: "Salaire",
          data: [
            salaire.salaireemb, // Add salaireemb to data
            ...salaire.salaires.map((s) => s.new_salary)
          ],
          backgroundColor: "#0FA66D",
          borderColor: "#0FA66D",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: data,
      options: options
    });

    return () => {
      chart.destroy();
    };
  }, [salaire]);

  return (
    <div>
      <canvas ref={chartRef} width="200" height="100"></canvas>
    </div>
  );
};

export default BarChart;

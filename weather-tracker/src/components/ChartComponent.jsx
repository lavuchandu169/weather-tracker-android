import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
} from 'chart.js';
import './ChartComponent.css';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function ChartComponent({ forecastData }) {
  const chartRef = useRef(null);
  const unit = localStorage.getItem('useFahrenheit') === 'true' ? '°F' : '°C';

  const labels = forecastData.map(item => item.date);
  const temperatures = forecastData.map(item => item.temp);

  const data = {
    labels,
    datasets: [
      {
        label: `Temp (${unit})`,
        data: temperatures,
        borderColor: '#3880ff',
        backgroundColor: 'rgba(56, 128, 255, 0.2)',
        tension: 0.3
      }
    ]
  };

  const handleDownload = () => {
    const chart = chartRef.current;
    if (!chart) return;

    const link = document.createElement('a');
    link.href = chart.toBase64Image();
    link.download = 'forecast-chart.png';
    link.click();
  };

  return (
    <div className="chart-container">
      <h3>5-Day Temperature Forecast</h3>
      <Line ref={chartRef} data={data} />
      <button className="download-button" onClick={handleDownload}>
        Download Chart
      </button>
    </div>
  );
}

export default ChartComponent;

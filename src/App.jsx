import React, { useState, useEffect } from 'react'
import './App.css'
import LineChart from './components/LineChart'
import { Line } from 'react-chartjs-2';

function App() {
  const [threshold, setThreshold] = useState(4);
  const [randomKeys, setRandomKeys] = useState(Array.from({length: 10}, () => Math.floor(Math.random() * 10) + 1));
  const [data, setData] = useState({
    labels: [...Array(10).keys()],
    datasets: [
      {
        label: 'LineChart',
        data: randomKeys,        
        tension: 0,              
        backgroundColor: 'rgba(95,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        // fill: { above: 'rgba(75,192,192,0.4)', below: 'rgba(75,192,192,0)', target: { value: threshold } },
        fill: true
      },
    ],
  });

  const handleChange = (e) => {
    if( e.target.value <= 10 && e.target.value >= 0 ) {
      setThreshold(e.target.value);
    }
  }

  useEffect(() => {
    
  }, [threshold]);

  const handleRandom = () => {
    const newArray = Array.from({length: 10}, () => Math.floor(Math.random() * 10) + 1);    
  
    setData({
      labels: [...Array(10).keys()],
      datasets: [
        {
          label: 'LineChart',
          data: newArray,        
          tension: 0,              
          backgroundColor: 'rgba(95,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          // fill: { above: 'rgba(75,192,192,0.4)', below: 'rgba(75,192,192,0)', target: { value: threshold } },
          fill: true
        },
      ],
    });
  }
  

  return (
    <>
      <h2 className='title'>Threshold Web App</h2>
      <div className='container'>
        <LineChart data={data} threshold={threshold}/>
        <div className='menu'>
          <span>Threshold</span>
          <input type='number' value={threshold} onChange={handleChange} placeholder='Enter a number' className='input'/>
          <button onClick={handleRandom} className='button'>Randomize</button>
        </div>
      </div>
    </>
  )
}

export default App

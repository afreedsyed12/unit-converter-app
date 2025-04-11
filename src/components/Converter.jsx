import React, { useState } from 'react';
import './App.css';

function Converter() {
  const [category, setCategory] = useState('length');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [result, setResult] = useState('');

  const units = {
    length: ['millimeter', 'centimeter', 'meter', 'kilometer', 'inch', 'foot', 'yard', 'mile'],
    weight: ['milligram', 'gram', 'kilogram', 'ounce', 'pound'],
    temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
  };

  const convert = () => {
    let value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Please enter a valid number');
      return;
    }

    let convertedValue;

    if (category === 'length') {
      const factors = {
        millimeter: 0.001,
        centimeter: 0.01,
        meter: 1,
        kilometer: 1000,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.34,
      };
      convertedValue = (value * factors[fromUnit]) / factors[toUnit];
    }

    if (category === 'weight') {
      const factors = {
        milligram: 0.001,
        gram: 1,
        kilogram: 1000,
        ounce: 28.3495,
        pound: 453.592,
      };
      convertedValue = (value * factors[fromUnit]) / factors[toUnit];
    }

    if (category === 'temperature') {
      if (fromUnit === toUnit) {
        convertedValue = value;
      } else if (fromUnit === 'Celsius') {
        convertedValue = toUnit === 'Fahrenheit'
          ? (value * 9) / 5 + 32
          : value + 273.15;
      } else if (fromUnit === 'Fahrenheit') {
        convertedValue = toUnit === 'Celsius'
          ? ((value - 32) * 5) / 9
          : ((value - 32) * 5) / 9 + 273.15;
      } else if (fromUnit === 'Kelvin') {
        convertedValue = toUnit === 'Celsius'
          ? value - 273.15
          : ((value - 273.15) * 9) / 5 + 32;
      }
    }

    setResult(convertedValue.toFixed(2));
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setFromUnit(units[newCategory][0]);
    setToUnit(units[newCategory][1]);
    setResult('');
  };

  return (
    <div className="container">
      <h1>Unit Converter 🌐</h1>

      <div>
        <label>Select Category: </label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>
      </div>

      <div>
        <input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div>
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          {units[category].map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <span>to</span>

        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          {units[category].map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>

      <button onClick={convert}>Convert</button>

      {result && (
        <div>
          <strong>Result: {result} {toUnit}</strong>
        </div>
      )}
    </div>
  );
}

export default Converter;

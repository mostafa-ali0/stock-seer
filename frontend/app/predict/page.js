'use client';

import { useState } from 'react';

export default function Predict() {
    const [ticker, setTicker] = useState('');
    const [days, setDays] = useState(10); // Default to 10 days
    const [algorithm, setAlgorithm] = useState('linear_regression'); // Default algorithm
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handlePredict = async () => {
        setPrediction(null);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8000/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticker,
                    days,
                    algorithm,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch prediction');
            }

            const data = await response.json();
            setPrediction(data);
        } catch (err) {
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h1>Stock Prediction</h1>
            <div>
                <label>
                    Ticker:
                    <input
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        placeholder="e.g., AAPL"
                    />
                </label>
            </div>
            <div>
                <label>
                    Number of Days:
                    <select
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                    >
                        <option value={1}>1 Day</option>
                        <option value={10}>10 Days</option>
                        <option value={20}>20 Days</option>
                        <option value={30}>30 Days</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Algorithm:
                    <select
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value)}
                    >
                        <option value="linear_regression">Linear Regression</option>
                        <option value="lstm">LSTM</option>
                        <option value="random_forest">Random Forest</option>
                    </select>
                </label>
            </div>
            <button onClick={handlePredict}>Predict</button>

            {prediction && (
                <div>
                    <h2>Predictions</h2>
                    <ul>
                        {prediction.predictions.map((value, index) => (
                            <li key={index}>
                                Day {index + 1} : {Number(value).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p>Prediction accracy: {prediction.score.toFixed(2)}%</p>
                    <ul>
                        {prediction.actual.map((value, index) => (
                            
                            <li key={index}>
                                Actual Day {index + 1} : {Number(value).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
}

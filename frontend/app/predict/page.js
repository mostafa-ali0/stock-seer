'use client';

import { useState } from 'react';

export default function Predict() {
    const [ticker, setTicker] = useState('');
    const [features, setFeatures] = useState([]);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handlePredict = async () => {
        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticker, features }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch prediction');
            }

            const data = await response.json();
            setPrediction(data.prediction);
            setError(null);
        } catch (err) {
            setError(err.message);
            setPrediction(null);
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
                    Features (comma-separated):
                    <input
                        type="text"
                        value={features}
                        onChange={(e) => setFeatures(e.target.value.split(',').map(Number))}
                        placeholder="e.g., 1,2,3"
                    />
                </label>
            </div>
            <button onClick={handlePredict}>Predict</button>

            {prediction && <p>Prediction: {prediction}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
}

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from models import train_linear_regression
import yfinance as yf
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

class PredictionRequest(BaseModel):
    ticker: str
    days: int
    algorithm: str

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        # Validate the algorithm
        if request.algorithm != "linear_regression":
            raise HTTPException(status_code=400, detail="Only linear regression is implemented")

        # Fetch stock data for the past year
        stock_data = yf.download(request.ticker, period="1y")

        if stock_data.empty:
            raise HTTPException(status_code=404, detail=f"No data found for ticker {request.ticker}")

        # Ensure at least 'days' worth of data is available
        if len(stock_data) < request.days:
            raise HTTPException(
                status_code=400,
                detail=f"Not enough data to predict for {request.days} days. Available data: {len(stock_data)} days.",
            )

        # Train Linear Regression and predict
        predictions, score, actual = train_linear_regression(stock_data, request.days)
    
        return {
                "ticker": request.ticker,
                "days": request.days,
                "predictions": predictions,
                "score": score,
                "actual": actual
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

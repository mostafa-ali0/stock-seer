from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
# from models import load_model, predict_price
# from preprocess import preprocess_data

# Initialize the FastAPI app
app = FastAPI()

# Load the machine learning model
# model = load_model()

# Define the input schema
class PredictionRequest(BaseModel):
    ticker: str
    features: list[float]

@app.get("/")
def read_root():
    """
    Root endpoint for API health check.
    """
    return {"message": "Welcome to the Stock Price Predictor API"}

@app.post("/predict")
def predict(request: PredictionRequest):
    """
    Endpoint for predicting stock prices.
    """
    try:
        # # Preprocess input features
        # processed_features = preprocess_data(request.features)

        # # Predict using the loaded model
        # prediction = predict_price(model, processed_features)

        return {
            "ticker": "AAPL",
            "prediction": 10
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

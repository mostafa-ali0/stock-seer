import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

def train_linear_regression(stock_data: pd.DataFrame, days: int):
    """
    Train a Linear Regression model and predict the next `days` stock prices.
    :param stock_data: Stock data DataFrame with 'Close' column.
    :param days: Number of days to predict and score on.
    :return: (predictions, score) where predictions is a list of floats and score is the MSE.
    """
    # Extract close prices and reset index for date handling
    stock_data = stock_data.reset_index()
    stock_data['DateOrdinal'] = stock_data['Date'].apply(lambda x: x.toordinal())

    # Prepare training and testing data
    X = stock_data[['DateOrdinal']].values
    y = stock_data['Close'].values

    # Training data (last year minus the days for testing)
    X_train, y_train = X[:-days], y[:-days]
    # Testing data (last `days`)
    X_test, y_test = X[-days:], y[-days:]

    # Train the Linear Regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Predict on the test set
    y_pred = model.predict(X_test)

    # Calculate R-squared score (accuracy)
    # r2 = r2_score(y_test, y_pred)


    return y_pred.tolist(), model.score(X, y)*100, y_test.tolist()

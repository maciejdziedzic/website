import joblib
import numpy as np
import pandas as pd

logistic_regression = joblib.load('data/saved_model.pkl')
feature_values = [0.05, 23, 0.4]
# Replace these with the actual feature names used during training
feature_names = ['gdp', 'cpi', 'iyc']

X_test = pd.DataFrame([feature_values], columns=feature_names)
pred_test = logistic_regression.predict(X_test)

print(pred_test)


def run_model():
    log_msg = 'hello model'
    print(log_msg)
    return log_msg

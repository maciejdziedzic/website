import joblib
import numpy as np
import os

# Set the correct path to the model file
model_path = os.path.join('backend', 'model', 'fed_model.pkl')
scaler = os.path.join('backend', 'model', 'fed_scaler.pkl')

# Load the model
log_reg_model = joblib.load(model_path)
scaler = joblib.load(scaler)

# # Define the input data
input_data = np.array([[0.2, 4.8]])

# # Scale the input data
input_data_scaled = scaler.transform(input_data)

# # Make a prediction
prediction = log_reg_model.predict(input_data_scaled)

print("Prediction:", prediction)

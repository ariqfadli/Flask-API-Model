from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
from joblib import load
import numpy as np

# Load the model and the scaler
model = load_model('stunting.h5')
scaler = load('scaler.pkl')

# Create a Flask app
app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "Hello World from ML Endpoint!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data
        data = request.get_json(force=True)
        input_data = data['input']
        print("Uploaded data:", input_data)
        
        # Reshape and scale your input
        input_data = np.array(input_data).reshape(1, -1)
        input_data_scaled = scaler.transform(input_data)

        # Make a prediction
        prediction = model.predict(input_data_scaled)
        output = prediction[0][0]

        # Interpret the output
        if output > 0.5:
            result = "Your child is stunting"
        else:
            result = "Your child is not stunting"

        # Return the result as a JSON response
        return jsonify(result=result)

    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)

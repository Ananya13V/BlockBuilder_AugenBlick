from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

model = load_model('../classifyWaste.h5')

def preprocess_image(image):
    img = Image.open(io.BytesIO(image))
    img = img.resize((224, 224))  
    img = np.array(img) / 255.0  
    img = np.expand_dims(img, axis=0)
    return img

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image'].read()
    processed_img = preprocess_image(image)

    prediction = model.predict(processed_img)
    predicted_class = np.argmax(prediction, axis=1)[0]  # Get the index of the predicted class

    # You can customize the response based on your model's output
    return jsonify({'predicted_class': predicted_class}), 200

if __name__ == '__main__':
    app.run(debug=True)

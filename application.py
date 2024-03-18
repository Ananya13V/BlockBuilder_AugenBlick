# from flask import Flask, render_template, request
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# import numpy as np
# from PIL import Image

# app = Flask(__name__)

# # Load the pre-trained model
# model = load_model("../classifyWaste.h5")
# class_names = ["cardboard", "glass", "metal", "paper", "plastic", "trash"]


# # Preprocess the image before passing it to the model
# def preprocess_image(image):
#     img = Image.open(image)
#     img = img.resize((256, 256))  # Resize image to match model's expected sizing
#     img = np.array(img) / 255.0  # Normalize pixel values to between 0 and 1
#     img = img.reshape(-1, 256, 256, 3)  # Reshape into a single sample with 3 channels
#     return img


# # Define a route to handle the form submission
# @app.route("/", methods=["GET", "POST"])
# def index():
#     if request.method == "POST":
#         if "file" in request.files:
#             file = request.files["file"]
#             if file:
#                 # Make prediction
#                 img = preprocess_image(file)
#                 prediction = model.predict(img)
#                 predicted_class = class_names[np.argmax(prediction)]
#                 return render_template("result.html", prediction=predicted_class)
#             else:
#                 # Handle case where no file was uploaded
#                 return render_template("index.html", error="No file uploaded.")
#         else:
#             # Handle case where "file" field is missing from form submission
#             return render_template("index.html", error="File field missing.")
#     return render_template("index.html")


# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, render_template, redirect, jsonify

# from flask_jsglue import (
#     JSGlue,
# )  # this is use for url_for() working inside javascript which is help us to navigate the url
import util
import os
from werkzeug.utils import secure_filename

application = Flask(__name__)

# JSGlue is use for url_for() working inside javascript which is help us to navigate the url
# jsglue = JSGlue()  # create a object of JsGlue
# jsglue.init_app(
#     application
# )  # and assign the app as a init app to the instance of JsGlue

util.load_artifacts()


# home page
@application.route("/")
def home():
    return render_template("index.html")


# classify waste
@application.route("/classifywaste", methods=["POST"])
def classifywaste():
    if "file" not in request.files:
        return jsonify(error="No file part")

    image_data = request.files["file"]

    if image_data.filename == "":
        return jsonify(error="No selected file")

    if image_data and util.allowed_file(image_data.filename):
        filename = secure_filename(image_data.filename)
        image_path = os.path.join(application.config["UPLOAD_FOLDER"], filename)
        image_data.save(image_path)

        try:
            predicted_value, details, video1, video2 = util.classify_waste(image_path)
            os.remove(image_path)
            return jsonify(
                predicted_value=predicted_value,
                details=details,
                video1=video1,
                video2=video2,
            )
        except Exception as e:
            # Log the error for debugging purposes
            print(f"Error occurred during image classification: {e}")
            return jsonify(error="An error occurred during image classification")
    else:
        return jsonify(error="File type not allowed")


# here is route of 404 means page not found error
# @application.errorhandler(404)
# def page_not_found(e):
#     # here i created my own 404 page which will be redirect when 404 error occured in this web app
#     return render_template("404.html"), 404


if __name__ == "__main__":
    application.run()

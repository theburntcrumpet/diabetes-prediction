# Run with uvicorn main:app --reload

from fastapi import FastAPI
import numpy as np
import tensorflow as tf
from tensorflow import keras

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

model = keras.models.load_model("diabetes.keras")

@app.get("/diabetes/")
async def read_diabetes_chance(age:int, 
                               gender:int, 
                               polyuria:int, 
                               polydipsia:int, 
                               weightloss:int, 
                               weakness:int, 
                               polyphagia:int, 
                               thrush:int,
                               blurring:int,
                               itching:int,
                               irritability:int,
                               delayed_healing:int,
                               partial_paresis:int,
                               muscle_stiffness:int,
                               alopecia:int,
                               obesity:int):
    idata = np.array([age,gender,polyuria,polydipsia,weightloss,weakness, polyphagia, thrush, 
                      blurring, itching, irritability,delayed_healing,partial_paresis,muscle_stiffness,alopecia,obesity])
    prediction = float(model.predict(idata)[0][0])
    return { "diabetes": prediction }
    
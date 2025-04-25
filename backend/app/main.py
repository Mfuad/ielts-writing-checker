from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from app.utils import textPredprocessing
from app.utils import roundScore
from app.classes import Item

import keras
load_model = keras.saving.load_model

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model('./model/model.keras')

@app.post("/api/score")
async def root(item: Item):
    [paddedTitle,paddedText] = textPredprocessing(item)
    pred = model.predict([paddedTitle,paddedText])
    
    for i,scope in enumerate(pred[0]):
        pred[0][i] = roundScore(scope)
   
    return JSONResponse(content=jsonable_encoder(
        {   
        "OverallScore":f"{roundScore((pred[0][0]+pred[0][1]+pred[0][2]+pred[0][3])/4)}",       
        "TaskAchievement":f"{pred[0][0]}",
        "CoherenceAndCohesion":f"{pred[0][1]}",
        "LexicalResource":f"{pred[0][2]}",
        "GrammaticalRange":f"{pred[0][3]}"
        }
        ))
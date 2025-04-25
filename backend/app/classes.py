from pydantic import BaseModel

class Item(BaseModel):
    title: str
    text: str

class resp(BaseModel):
    OverallScore:str            
    TaskAchievement:str
    CoherenceAndCohesion:str
    LexicalResource:str
    GrammaticalRange:str
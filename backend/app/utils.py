import pickle
import keras
pad_sequences = keras.preprocessing.sequence.pad_sequences

with open('./model/tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

def textPredprocessing(item):
    title = [str(item.title)]
    text = [str(item.text)]

    sequencesTitle = tokenizer.texts_to_sequences(title)
    sequencesText = tokenizer.texts_to_sequences(text)

    paddedTitle = pad_sequences(sequencesTitle, maxlen=200)
    paddedText = pad_sequences(sequencesText, maxlen=900)

    return [paddedTitle, paddedText]

def roundScore(score):
    integer_part = int(score)
    decimal_part = score - integer_part

    if decimal_part < 0.25:
        return integer_part
    elif 0.25 <= decimal_part < 0.75:
        return integer_part + 0.5
    else:
        return integer_part + 1
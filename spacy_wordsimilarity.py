# pip install spacy
# python -m spacy download en_core_web_lg

import spacy

nlp = spacy.load("en_core_web_lg")

w1 = "watch"
w2 = "eyes"
print("word1: ", w1, "  |  word2: ", w2)

w1 = nlp.vocab[w1]
w2 = nlp.vocab[w2]
print( "similarity: ", w1.similarity(w2))
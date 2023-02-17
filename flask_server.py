from flask import Flask, request
from flask_cors import CORS
import yake
# import spacy

app = Flask(__name__)
CORS(app)


# nlp = spacy.load("en_core_web_lg")

# f = open("demo_script.txt", "r")
# doc = f.read()

language = "en"
max_ngram_size = 3
deduplication_thresold = 0.9
deduplication_algo = 'seqm'
windowSize = 1

# text = ""


# kw_extractor = yake.KeywordExtractor()
# keywords = kw_extractor.extract_keywords(doc)
def extraction(numOfKeywords):
    kw_extractor = yake.KeywordExtractor(
        lan=language, n=max_ngram_size, 
        dedupLim=deduplication_thresold, 
        dedupFunc=deduplication_algo, 
        windowsSize=windowSize, top=numOfKeywords, features=None)
    print("typeof text", type(text))

    keywords = kw_extractor.extract_keywords(text.decode('utf-8'))
    print("len", len(keywords), numOfKeywords)
    return keywords

    # print("keywords \n",keywords)
    # keywords_embeddings = []
    # for kw in keywords:
    #     print(kw[0])
    #     keywords_embeddings.append(nlp.vocab[kw])
    # print("keywords_embeddings", keywords_embeddings)

@app.route("/extract", methods=["POST"])
def extract_key_words():
    f = request.files['textfile']
    # numOfKeywords = request.form['numKeywords']
    global text 
    text = f.read()
    extracted = extraction(50)
    return extracted

@app.route("/keywords", methods=["POST"])
def get_keywords():
    numOfKeywords = request.form['numKeywords']
    print("numOfKeywords", numOfKeywords)
    extracted = extraction(numOfKeywords)
    return extracted

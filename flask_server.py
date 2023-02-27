from flask import Flask, request
from flask_cors import CORS
import yake
import json
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
selected_keywords = {}

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

@app.route("/keywords", methods=["GET", "POST"])
def get_keywords():
    global selected_keywords
    if request.method == "GET" :
        return json.dumps(selected_keywords)
    elif request.method == "POST":
        selected_keywords = request.json
        print(selected_keywords)
        print(selected_keywords['selectedKeywords'])
        return "Done"
    else:
        return "nth"

@app.route("/modify", methods=["GET", "POST"])
def display_modified():
    if request.method == "GET":
        return
    elif request.method == "POST":
        return
    else:
        return
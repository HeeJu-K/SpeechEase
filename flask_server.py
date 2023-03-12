from flask import Flask, request
from flask_cors import CORS
from nltk.corpus import wordnet
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
modified_keywords = {}

#extract keywords from the text file received
def extraction(numOfKeywords):
    kw_extractor = yake.KeywordExtractor(
        lan=language, n=max_ngram_size, 
        dedupLim=deduplication_thresold, 
        dedupFunc=deduplication_algo, 
        windowsSize=windowSize, top=numOfKeywords, features=None)

    keywords = kw_extractor.extract_keywords(text.decode('utf-8'))
    keywords = [columns[0] for columns in keywords]
    # print("len", len(keywords), numOfKeywords)
    keywords = get_synonyms(keywords)
    return keywords

#append synonyms to the list of keywords extracted from script
def get_synonyms(original_kw):
    # print("for getting synonym")
    similar_list = [[]]
    print("for getting synonym original_kw", original_kw)
    for kw in original_kw:
        print("for getting synonym kw", kw)
        tmp = []
        for syn in wordnet.synsets(kw):
            for l in syn.lemmas():
                if l.name() != kw and len(tmp)<4 and l.name() not in tmp and l.name != kw.lower():
                    tmp.append(l.name().replace('_', " "))
       
        print("see tmp", tmp, similar_list)
        row = []
        row.append(kw)
        for t in tmp:
            row.append(t)
        similar_list.append(row)

    print("appended kw: ", similar_list)
    return similar_list

@app.route("/extract", methods=["POST"])
def extract_key_words():
    f = request.files['textfile']
    # numOfKeywords = request.form['numKeywords']
    global text 
    text = f.read()
    extracted = extraction(50)
    return json.dumps(extracted)

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
    global modified_keywords
    if request.method == "GET":
        print("get modified keywords: ", modified_keywords)
        return json.dumps(modified_keywords)
    elif request.method == "POST":
        modified_keywords = request.json
        print("post modified keywords: ", modified_keywords)
        return modified_keywords
    else:
        return
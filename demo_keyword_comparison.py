import yake
import spacy

nlp = spacy.load("en_core_web_lg")

f = open("demo_script.txt", "r")
doc = f.read()

language = "en"
max_ngram_size = 3
deduplication_thresold = 0.9
deduplication_algo = 'seqm'
windowSize = 1
numOfKeywords = 20

kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_thresold, dedupFunc=deduplication_algo, windowsSize=windowSize, top=numOfKeywords, features=None)

# kw_extractor = yake.KeywordExtractor()
keywords = kw_extractor.extract_keywords(doc)
print("keywords \n",keywords)
keywords_embeddings = []
for kw in keywords:
  print(kw[0])
  keywords_embeddings.append(nlp.vocab[kw])
  print("keywords_embeddings", keywords_embeddings)
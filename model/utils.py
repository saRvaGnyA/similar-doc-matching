import fitz
import pickle
from sklearn.metrics.pairwise import cosine_similarity

with open('./model/cluster_model.pkl', 'rb') as f:
    cluster_model = pickle.load(f)

def extract_text_from_pdf(pdf_file):
    with fitz.open(stream=pdf_file, filetype='application/pdf') as doc:
        text = ""
        for page_num in range(len(doc)):
            page = doc[page_num]
            text += page.get_text()
        return text

def get_similarity(text):
    vectorizer = cluster_model['vectorizer']
    with open('./valid_template/valid.pdf', 'rb') as f:
        valid = extract_text_from_pdf(f.read())

    valid = vectorizer.transform([valid])[0]
    similarity = cosine_similarity(valid, text).sum()
    if similarity < 0.4:
        return ('amber', similarity)
    elif similarity>0.85:
        return ('red', similarity)
    else:
        return ('green', similarity)


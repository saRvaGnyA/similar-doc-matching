# from typing import Annotated, List
import os

from contextlib import asynccontextmanager

import pickle
import numpy as np

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client

from utils import extract_text_from_pdf, get_similarity

load_dotenv()

with open('./model/cluster_model.pkl', 'rb') as f:
    cluster_model = pickle.load(f)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_methods = ['GET', 'POST']
)

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.post('/upload_invoice')
def upload_invoice(claim_id:str = Form(...), invoice: UploadFile = File(...)):
    try:
        pdf_invoice = invoice.file.read()
        text = extract_text_from_pdf(pdf_invoice)
        cluster_id = cluster_model.predict([text])[0]
        dist_centroid = np.min(cluster_model.transform([text])[0])
        text_vector = cluster_model['vectorizer'].transform([text])[0]
        flag, similarity = get_similarity(text_vector)
        data, count = supabase.table('cluster_records').insert(
            {
                'id': claim_id, 'cluster_id':int(cluster_id), 'dist_centroid': dist_centroid,'flag':flag, 'invoice_text': text 
            }
            ).execute()

        print(data, count)
        return {'flag': flag, 'similarity': similarity, 'claim_id': claim_id}

    except Exception as e:
        print(e)
        return {'message': 'something went wrong with the file upload'}
    finally:
        invoice.file.close()



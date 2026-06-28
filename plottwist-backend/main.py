import json

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import anthropic
import pdfplumber
import io
import os

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...), goal: str = Form(...)):
    contents = await file.read()
    
    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        cv_text = " ".join(page.extract_text() for page in pdf.pages)

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4000,
        messages=[{
            "role": "user",
            "content": f"""You are a career advisor. Analyze this CV and career goal.

CV: {cv_text}

Career Goal: {goal}

Return a JSON object only, no extra text, with exactly these fields:
{{
  "existing_skills": [{{ "name": "skill name", "score": 85 }}],
  "missing_skills": [{{ "name": "skill name", "why_it_matters": "reason" }}],
  "readiness_score": 72,
  "plan": [{{ "milestone": "title", "timeframe": "Month 1-2", "actions": ["action 1", "action 2"] }}]
}}"""
        }]
    )

    import re

    raw = message.content[0].text
    # strip markdown code blocks if present
    raw = re.sub(r"```json|```", "", raw).strip()
    print(raw)  # add this
    result = json.loads(raw)
    return result
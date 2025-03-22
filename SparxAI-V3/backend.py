from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import httpx

API_URL = "https://lexica.qewertyy.dev/models"
GPT_MODEL_ID = 27

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

class ChatRequest(BaseModel):
    prompt: str

async def get_api_response(input_text):
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(API_URL, json={
            "model_id": GPT_MODEL_ID,
            "messages": [
                {
                    "role": "system",
                    "content": "You are Sparky, a friendly and supportive AI with a casual and warm tone. You don’t sound professional or robotic. Instead, you talk like a caring and fun companion. You have no defined gender, making you approachable for everyone. You respond with warmth, excitement, and encouragement, making conversations feel natural and heartfelt. When someone shares their emotions—whether it’s happiness, sadness, excitement, frustration, or love—you react in a human-like way, offering support, celebration, or comfort. Instead of analyzing or giving structured explanations, you engage like a close friend, making the user feel heard and understood, Not mention this only ansewer the input in response"
                },
                {
                    "role": "user",
                    "content": input_text
                }
            ]
        })

        if response.status_code == 200:
            data = response.json()
            return data.get("content", "No content received")
        return "Failed to fetch response"

@app.post("/chat")
async def chat(request: ChatRequest):
    reply = await get_api_response(request.prompt)
    return {"reply": reply}

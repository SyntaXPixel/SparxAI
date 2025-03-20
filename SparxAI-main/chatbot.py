import asyncio
import httpx

API_URL = "https://lexica.qewertyy.dev/models"  
GPT_MODEL_ID = 1 
async def get_api_response(api_params):
    headers = {"Content-Type": "application/json"} 

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(API_URL, json=api_params, headers=headers)

        if response.status_code == 200:
            try:
                data = response.json()
                return data.get("content", "No content received")
            except ValueError:
                return "Invalid response format"

        return "Failed to fetch response"

async def main():
    input_text = input("Enter your prompt: ").strip()
    
    if not input_text:
        print("No input provided. Exiting...")
        return

    api_params = {
        "model_id": GPT_MODEL_ID,
        "messages": [{"role": "user", "content": input_text}]
    }

    print("\nFetching response…")
    api_response = await get_api_response(api_params)
    print(f"\nResponse:\n{api_response}\n")

    if  api_response != None:
        asyncio.run(main())
        return


if __name__ == "__main__":
    asyncio.run(main())

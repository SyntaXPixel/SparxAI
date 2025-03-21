# SparxAI

SparxAI is an open-source AI project designed to expand artificial intelligence capabilities. Anyone can view, share, and modify it to contribute to its growth and innovation. However, **commercial use is strictly prohibited**.  

**Powered by [LexicaAPI](https://lexica.qewertyy.dev/)**

SparxAi utilizes **LexicaAPI** created by Qewertyy which provides an API for AI-driven services  

**Content Attribution** 

All **response content** generated using LexicaAPI **belongs its creator, [Qewertyy](https://github.com/QEWERTYY)**. SparxAi only serves as an interface for accessing this API and does not claim ownership of the generated content.

# SparxAI - Quick Start Guide

This guide will help you quickly set up and run **SparxAI** in VS Code.

---

## 1. Install Requirements
First, install the necessary dependencies:

```bash
pip install -r requirements.txt
```

If you're using a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate    # Windows
```

---

## 2. Start the Backend (FastAPI)
Run the backend server:

```bash
uvicorn backend:app --reload
```

- The API will run at: **http://127.0.0.1:8000**
- Open API documentation: **http://127.0.0.1:8000/docs**

---

## 3. Start the Frontend (HTML File)
Simply open `index.html` in your browser. 
- Right-click `index.html`
If you're using VS Code:
- Select **Open with Live Server** (if installed) or open in your browser manually.

---

## 4. Stopping the Server
Press `CTRL + C` in the terminal to stop the backend.
Deactivate virtual environment if used:
```bash
deactivate
```

---




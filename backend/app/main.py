from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
import httpx

from app.modules.ideas.api import router as ideas_router
from app.modules.contracts.api import router as contracts_router
from app.modules.rules.api import router as rules_router
from app.runtime.api import router as runtime_router

app = FastAPI(title="Minicontratos API", version="0.2.0")

# CORS
allow_origins = [o.strip() for o in settings.FRONTENDS.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True, "ns": settings.APP_NAMESPACE}

# LLM chat (MVP)
@app.post("/api/v1/llm/chat")
async def llm_chat(payload: dict):
    msg = (payload or {}).get("message", "")
    return {"reply": f"eco/IA (ns={settings.APP_NAMESPACE}): {msg}"}

# Grammar interpret (MVP) – grava no Supabase
@app.post("/api/v1/grammar/interpret")
async def interpret(payload: dict, authorization: str | None = Header(default=None)):
    text = (payload or {}).get("text") or ""
    if not text:
        raise HTTPException(400, "text vazio")

    body = {
        "who": "anonymous",
        "did": "declare",
        "this": text,
        "confirmed_by": "system",
        "if_ok": "confirm",
        "if_doubt": "review",
        "if_not": "deny",
        "status": "pending",
        "valid": False,
        "origin": "app://minicontratos",
        "app_namespace": settings.APP_NAMESPACE,
        "tenant_id": "00000000-0000-0000-0000-000000000000",
    }

    async with httpx.AsyncClient(timeout=20) as client:
        r = await client.post(
            settings.SUPABASE_URL.rstrip("/") + "/rest/v1/logline_global",
            headers={
                "apikey": settings.SUPABASE_SECRET_KEY,
                "Authorization": f"Bearer {settings.SUPABASE_SECRET_KEY}",
                "Content-Type": "application/json",
                "Prefer": "return=representation",
            },
            json=body,
        )
        if r.status_code >= 300:
            raise HTTPException(r.status_code, r.text)
        data = r.json()

    return {"parsed": {"text": text}, "inserted_id": data[0]["id"] if isinstance(data, list) and data else None}

# Include existing routers
app.include_router(ideas_router, prefix="/api/v1", tags=["ideas"])
app.include_router(contracts_router, prefix="/api/v1", tags=["contracts"])
app.include_router(rules_router, prefix="/api/v1", tags=["rules"])
app.include_router(runtime_router, prefix="/api/v1", tags=["runtime"])

from jose import jwt
import httpx
from app.core.config import settings

_cached = None

async def get_jwks():
    global _cached
    if _cached is None:
        async with httpx.AsyncClient(timeout=10) as c:
            r = await c.get(str(settings.JWKS_URL))
            r.raise_for_status()
            _cached = r.json()
    return _cached

async def verify_supabase_token(token: str) -> dict | None:
    try:
        jwks = await get_jwks()
        return jwt.decode(token, jwks, algorithms=["RS256"], options={"verify_aud": False})
    except Exception:
        return None

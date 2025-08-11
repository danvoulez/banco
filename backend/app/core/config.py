from pydantic_settings import BaseSettings
from pydantic import Field, AnyUrl

class Settings(BaseSettings):
    # Supabase (2025)
    SUPABASE_URL: AnyUrl = Field(..., description="https://<ref>.supabase.co")
    SUPABASE_SECRET_KEY: str = Field(..., description="sb_secret_... (backend)")
    JWKS_URL: AnyUrl = Field(..., description="https://<ref>.supabase.co/auth/v1/.well-known/jwks.json")

    # App
    APP_NAMESPACE: str = "minicontratos"
    FRONTENDS: str = "https://minicontratos.voulezvous.ai,http://localhost:5173"

    class Config:
        env_file = ".env"

settings = Settings()

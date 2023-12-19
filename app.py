from uuid import uuid4

from fastapi import FastAPI, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, PositiveInt, Field, EmailStr


class Category(BaseModel):
    id: PositiveInt
    name: str = Field(
        min_length=2, max_length=32
    )


class SignUp(BaseModel):
    email: EmailStr
    password: str
    password2: str


class SignIn(BaseModel):
    email: EmailStr
    password: str


categories = [
    Category(id=1, name="Coffee"),
    Category(id=2, name="Tea"),
    Category(id=3, name="Pancake"),
    Category(id=4, name="Sweets"),
]


app = FastAPI()
app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_origins=("*", ),
    allow_methods=("*", ),
    allow_headers=("*", ),
    allow_credentials=True
)


@app.get(
    path="/categories",
    response_model=list[Category]
)
async def get_category_list():
    return categories


@app.post(
    path="/registration"
)
async def sign_up(data: SignUp):
    if data.password == data.password2:
        return {"status": True}
    return {"status": False}


@app.post(
    path="/login"
)
async def sign_in(data: SignIn):
    return {"token": str(uuid4())}


@app.get(
    path="/profile"
)
async def profile(authorization: str = Header()):
    return {"status": True}


if __name__ == '__main__':
    from uvicorn import run
    run(
        app=app,
        host="0.0.0.0",
        port=8000
    )

import os

base_dir = os.path.dirname(os.path.abspath(__file__))


class Config():
    SECRET_KEY = os.environ.get("SECRETKET") or "default"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_RECORD_QUERIES = True
    SSL_REDIRECT = False


class Development(Config):
    SQLALCHEMY_DATABASE_URI = os.environ["SQLALCHEMY_DATABASE_URI"]
    SQLALCHEMY_TRACK_MODIFICATIONS = os.environ["SQLALCHEMY_TRACK_MODIFICATIONS"]


config = {
    "development" : Development
}
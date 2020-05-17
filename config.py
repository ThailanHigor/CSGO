import os

base_dir = os.path.dirname(os.path.abspath(__file__))


class Config():
    SECRET_KEY = os.environ.get("SECRETKET") or "default"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_RECORD_QUERIES = True
    SSL_REDIRECT = False


class Development(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(base_dir, "portifolio.db")
    UPLOAD_FOLDER = os.path.join(base_dir, 'app','static', 'uploads')


config = {
    "development" : Development
}
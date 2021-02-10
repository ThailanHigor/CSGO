from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import config
from flask_cors import CORS, cross_origin
db = SQLAlchemy()

def create_app(config_name):
    app = Flask(__name__)
    CORS(app, support_credentials=True)
    app.config.from_object(config[config_name])
    db.init_app(app)
    #register blueprints
    from app import routes
    routes.load(app)

    return app
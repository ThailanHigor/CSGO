from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import config
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

db = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    db.init_app(app)
    
    manager = Manager(app)
    migrate = Migrate(app, db)

    manager.add_command('db', MigrateCommand)

    CORS(app)
    api = Api(app, prefix="/api")
    
    from app import routes
    routes.load(api)

    return app
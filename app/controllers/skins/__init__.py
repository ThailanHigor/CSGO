from flask import Blueprint

skins = Blueprint("skins", __name__)
from . import views
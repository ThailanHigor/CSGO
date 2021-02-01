from flask import Blueprint

steps = Blueprint("steps", __name__)
from . import views
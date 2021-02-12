from flask import Blueprint

weapons = Blueprint("weapons", __name__)
from . import views
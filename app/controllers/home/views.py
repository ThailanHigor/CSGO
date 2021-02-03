from . import home
from flask import render_template
from app import db

from app.models import WeaponType

@home.route("/", methods=["GET"])
def index():
    weaponsTypes = WeaponType.query.order_by(WeaponType.order).all()
    return render_template("Home/home.html", weaponsTypes=weaponsTypes)

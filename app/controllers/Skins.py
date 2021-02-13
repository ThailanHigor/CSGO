from flask_restful import Resource, marshal
from app.models.Skin import Skin
from app.schemas.skin_fields import skin_fields
from app import request

class Skins(Resource):
    def post(self): 
        weapon = request.only(["weapon_id"])
        skins = Skin.query.order_by(Skin.order).filter(Skin.weapon_id == weapon["weapon_id"]).all()
        return marshal(skins, skin_fields, "skins")
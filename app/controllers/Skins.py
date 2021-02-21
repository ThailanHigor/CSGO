from flask_restful import Resource, marshal
from app.models.Skin import Skin
from app.schemas.skin_fields import skin_fields
from app import request, db

class Skins(Resource):
    def post(self): 
        weapon = request.only(["weapon_id"])
        skins = Skin.query.order_by(Skin.order).filter(Skin.weapon_id == weapon["weapon_id"]).all()
        return marshal(skins, skin_fields, "skins")
    
    def put(self):
        request_data = request.only(["skin_id"])
        skin = Skin.query.get(request_data["skin_id"])
        skin.views += 1
        db.session.commit()
        return {"sucess": True}
    
    def get(self):
        skins = Skin.query.order_by(Skin.views.desc()).limit(5).all()
        return marshal(skins, skin_fields, "skins")
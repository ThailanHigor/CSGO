from flask_restful import Resource, marshal
from app.models.Weapon import Weapon
from sqlalchemy import and_, or_
from app.schemas.weapon_fields import weapon_fields
from app import request

class Weapons(Resource):
    def post(self):
        request_data = request.only(["weapon_type_id", "team_name"])
        weapon_type_id = request_data['weapon_type_id']
        team_name = request_data['team_name']

        weapons = Weapon.query.order_by(Weapon.order).filter(
            and_(Weapon.weaponType_id == weapon_type_id, Weapon.weaponVariable == None, 
                or_(Weapon.team == team_name, Weapon.team == "ALL")
            )).all()
            
        is_knife = weapon_type_id == "6"

        return {"flag_knives": is_knife, "weapons": marshal(weapons, weapon_fields)}


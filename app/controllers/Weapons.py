from flask_restful import Resource, marshal
from app.models import Weapon, RandomMessage
from sqlalchemy import and_, or_
from app.schemas.weapon_fields import weapon_fields
from app import request
import random

class Weapons(Resource):
    def post(self):
        request_data = request.only(["weapon_type_id", "team_name"])
        weapon_type_id = request_data['weapon_type_id']
        team_name = request_data['team_name']

        weapons = Weapon.query.order_by(Weapon.order).filter(
            and_(Weapon.weaponType_id == weapon_type_id, Weapon.weaponVariable == None, 
                or_(Weapon.team == team_name, Weapon.team == "ALL")
            )).all()
        
        #select a sorted message from weapon type
        randomMessage = RandomMessage.query.filter(RandomMessage.weaponType_id == weapon_type_id).all()
        randomInteger = random.randint(0, (len(randomMessage)-1))
        messageSorted = randomMessage[randomInteger].message

        
        for weapon in weapons:
            weaponVariable = Weapon.query.order_by(Weapon.order).filter(Weapon.weaponVariable == weapon.id).first()
            weapon.setWeaponVariable(weaponVariable)    

        is_knife = weapon_type_id == "6"
        return {"message": messageSorted, "flag_knives": is_knife, "weapons": marshal(weapons, weapon_fields)}


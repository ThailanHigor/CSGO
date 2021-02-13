from flask_restful import Resource, marshal
from app.models import WeaponType
from app.schemas.weapon_fields import weapon_types_fields

class WeaponsTypes(Resource):
    def post(self):
        weaponsTypes = WeaponType.query.order_by(WeaponType.order).all()
        return marshal(weaponsTypes, weapon_types_fields, "weapon_types")

from . import weapons
from flask import request, jsonify
from app.models.Weapon import Weapon
from app.models import WeaponType
from sqlalchemy import and_, or_


@weapons.route("/api/weaponTypes", methods=["POST"])
def getWeaponsTypes():
    weaponsTypes = WeaponType.query.order_by(WeaponType.order).all()
        
    message = "Nice escolha pra fechar o inventário em!"
    result = [
        {
            'id': weaponsType.id, 
            'name': weaponsType.name, 
            "slug": weaponsType.slug
        } for weaponsType in weaponsTypes
    ]
    return jsonify(weaponTypes=result, message=message)


@weapons.route("/api/getWeaponsByCategory", methods=["POST"])
def getWeaponsByCategory():
    request_data  = request.get_json()
    weapon_type_id = request_data['weapon_type_id']
    team_name = request_data['team_name']

    weapons = Weapon.query.order_by(Weapon.order).filter(
        and_(Weapon.weaponType_id == weapon_type_id, Weapon.weaponVariable == None, 
            or_(Weapon.team == team_name, Weapon.team == "ALL")
        )).all()
        
    message = "Nice escolha pra fechar o inventário em!"
    result = [
        {
            'id': weapon.id, 
            'name': weapon.name, 
            "weaponType_id": weapon.weaponType_id, 
            "slug": weapon.slug, 
            "filter_term": weapon.filterTerm,
            "image": weapon.image
        } for weapon in weapons
    ]

    is_knife = weapon_type_id == "6"
    
    return jsonify(weapons=result, flag_knives=is_knife, message=message)


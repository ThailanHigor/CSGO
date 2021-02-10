from . import steps
from flask import render_template, request, jsonify
from app import db
from app.models.Weapon import Weapon
from app.models.Skin import Skin
from app.models.PriceTable import PriceTable
from app.models import WeaponType
from app.services.Search.Scraping import search_skin
import asyncio
from sqlalchemy import and_, or_
from flask_cors import cross_origin

@steps.route("/api/weaponTypes", methods=["POST"])
@cross_origin()
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
    response = jsonify(weaponTypes=result, message=message)
    # response.headers.add("Access-Control-Allow-Origin", "*")

    return response


@steps.route("/api/getWeaponsByCategory", methods=["POST"])
@cross_origin()
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
    response = jsonify(weapons=result, flag_knives=is_knife, message=message)
    # response.headers.add("Access-Control-Allow-Origin", "*")

    return response


@steps.route("/api/getSkinsFromWeapon", methods=["POST"])
def getSkinsFromWeapon(): 
    request_data  = request.get_json()

    weaponSelectedId = request_data['weaponSelectedId']
    print(weaponSelectedId)
    
    skins = Skin.query.order_by(Skin.order).filter(Skin.weapon_id == weaponSelectedId).all()
    message = "Agora é só escolher a skin!"
    result = [
        {
            'id': skin.id, 
            'name': skin.name, 
            "weaponType_id": skin.weapon_id, 
            "slug": skin.slug, 
            "filter_term": skin.filterTerm,
            "image": skin.image,
            "category": skin.category
        } for skin in skins
    ]
    
    return jsonify(skins=result, message=message)


@steps.route("/api/getSkinInfo", methods=["POST"])
def getSkinInfo():
    request_data  = request.get_json()
    skinSelectedId = request_data['skin_selected_id']

    print(skinSelectedId)

    skin = Skin.query.filter(Skin.id == skinSelectedId).first()
    
    prices_normals = []
    prices_stattrak = []
    floats = {
        "Nova de Fábrica (FN)": ["FN", "Factory New"],
        "Pouco Usada (MW)" : ["MW", "Minimal Wear"],
        "Testada em Campo (FT)": ["FT", "Field-Tested"],
        "Bem Desgastada (WW)": ["WW", "Well-Worn"],
        "Veterana de Guerra (BS)": ["BS","Battle-Scarred"]
    }

    if("Vanilla" in skin.name):
        floats = {
            "Vanilla": ["Vanilla"],
        }
    

    results = asyncio.run(search_skin(skin))
 
    normals = [x for x in results if not x.stattrak]
    statrak = [x for x in results if x not in normals]



    for key, value in floats.items():
        priceTableItem = PriceTable(key)
    
        for normal in normals:   
            if (any(s in normal.name for s in value)):
                if(normal.store == "CSGO Store"): 
                    priceTableItem.PriceCSGOStore = normal.price
                    priceTableItem.LinkCSGOStore = normal.link
                elif(normal.store == "NeshaStore"):
                    priceTableItem.PriceNesha = normal.price
                    priceTableItem.LinkNesha = normal.link
                elif(normal.store == "BleikStore"):
                    priceTableItem.PriceBleik = normal.price
                    priceTableItem.LinkBleik = normal.link
                elif(normal.store == "Steam"):
                    priceTableItem.PriceSteam = normal.price
                    priceTableItem.LinkSteam = normal.link

        prices_normals.append(priceTableItem)

    for key, value in floats.items():
        priceTableItem = PriceTable(key + " - StatTrak™")
        for stats in statrak:     
            if (any(s in stats.name for s in value)):
                if(stats.store == "CSGO Store"): 
                    priceTableItem.PriceCSGOStore = stats.price
                    priceTableItem.LinkCSGOStore = stats.link
                elif(stats.store == "NeshaStore"):
                    priceTableItem.PriceNesha = stats.price
                    priceTableItem.LinkNesha = stats.link
                elif(stats.store == "BleikStore"):
                    priceTableItem.PriceBleik = stats.price
                    priceTableItem.LinkBleik = stats.link     
                elif(stats.store == "Steam"):
                    priceTableItem.PriceSteam = stats.price
                    priceTableItem.LinkSteam = stats.link                
        
        prices_stattrak.append(priceTableItem)

    message = "É isso, se liga nos preços aí!"
    result_normals = [d.__dict__ for d in prices_normals]
    result_stattrak = [d.__dict__ for d in prices_stattrak]
    
    return jsonify(prices_normals=result_normals, price_stattrak=result_stattrak, message=message, name=skin.name, image=skin.image )

from . import steps
from flask import render_template, request, jsonify
from app import db
from app.models.Weapon import Weapon
from app.models.Skin import Skin
from app.models.PriceTable import PriceTable
from app.services.Search.Scraping import search_skin
import asyncio
from sqlalchemy import and_, or_

@steps.route("/steps/getWeaponsByCategory", methods=["GET"])
def getWeaponsByCategory():
    weapon_type_id = request.args.get('weapon_type_id')
    team_name = request.args.get('team_name')
    
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


@steps.route("/steps/getSkinsFromWeapon", methods=["GET"])
def getSkinsFromWeapon(): 
    weaponSelectedSlug = request.args.get('weaponSelectedSlug')
    weaponSelectedId = request.args.get('weaponSelectedId')
    print(weaponSelectedSlug)
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


@steps.route("/steps/getSkinInfo", methods=["GET"])
def getSkinInfo():
    skin_selected = request.args.get('skinSelected')
    skinSelectedId = request.args.get('skinSelectedId')
    weapon_selected_filter_name = request.args.get('weaponSelected')
    print(skin_selected)
    print(weapon_selected_filter_name)
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


# @steps.route("/steps/TranslateToBR", methods=["GET"])
# def translateToBR():
#     import requests
    
#     skins = Skin.query.all()
  
#     for skin in skins:
#         print("original:", skin.filterTerm)
#         cookie = {'steamLoginSecure': '76561198360624224%7C%7C8245D5D158B280E3FB133B8F9A7F081B0448F1EA'}    
#         url = f"https://steamcommunity.com/market/search/render/?appid=730&currency=7&country=BR&norender=1&count=1&query={skin.filterTerm}"
#         print(url)
#         page = requests.get(url, cookies=cookie)
#         response = page.json()
#         print("traduzido:", (response["results"]))
#         print()
    
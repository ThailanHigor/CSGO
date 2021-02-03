from . import steps
from flask import render_template, request, jsonify
from app import db
from app.models.Weapon import Weapon
from app.models.Skin import Skin
from app.models.PriceTable import PriceTable
from app.services.Search.Scraping import Scraping

@steps.route("/steps/getWeaponsByCategory", methods=["GET"])
def getWeaponsByCategory():
    weapon_type_id = request.args.get('weapon_type_id')
    print(weapon_type_id)
    
    weapons = Weapon.query.filter(Weapon.weaponType_id == weapon_type_id).all()
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

    return jsonify(weapons=result, message=message)


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
    results = Scraping().search_skin(skin_selected)
    
    prices = []
    floats = {
        "FN Factory New": "Nova de Fábrica (FN)",
        "MW Minimal Wear": "Pouco Usada (MW)", 
        "FT Field-Tested": "Testada em Campo (FT)", 
        "WW Well-Worn": "Bem Desgastada (WW)", 
        "BS Battle-Scarred": "Veterana de Guerra (BS)"
    }

    for key, value in floats.items():
        priceTableItem = PriceTable(value)

        for result in results:     
            print(key, result)
            if(key.split(" ")[0] in result.name or key.split(" ")[1] in result.name):
                if(result.store == "CSGO Store"): 
                    priceTableItem.PriceCSGOStore = result.price
                    priceTableItem.LinkCSGOStore = result.link
                elif(result.store == "NeshaStore"):
                    priceTableItem.PriceNesha = result.price
                    priceTableItem.LinkNesha = result.link
                elif(result.store == "BleikStore"):
                    priceTableItem.PriceBleik = result.price
                    priceTableItem.LinkBleik = result.link
        
        prices.append(priceTableItem)

    message = "É isso, se liga nos preços aí!"
    result = [d.__dict__ for d in prices]
    
    return jsonify(prices=result, message=message, name=skin.name, image=skin.image )
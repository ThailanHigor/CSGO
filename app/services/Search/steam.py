
import requests
from bs4 import BeautifulSoup
from app.models.Weapon import Weapon
import re
import asyncio
import json

async def search_in_Steam(text):

    url = f"https://steamcommunity.com/market/search?appid=730&cc=br&count=10&q={text}"
    
    weapon_list = []
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    print(url)

    cotacao_req = requests.get("https://economia.awesomeapi.com.br/all/USD")
    cotacao_dolar_atual = cotacao_req.json()["USD"]["low"]

    productList = soup.find_all("a", {"class": "market_listing_row_link"})
    if productList != None:
        for product in productList: 
            link = product.get("href")
            name = product.find("div",{"class":"market_listing_row market_recent_listing_row market_listing_searchresult"}).get("data-hash-name")
            price_text = product.find("span",{"class":"normal_price"}).find("span",{"class":"normal_price"}).getText().replace("$","").replace(" USD","")
            price = "%.2f" %(float(price_text.replace(",","")) * float(cotacao_dolar_atual))
                        
            weapon = Weapon(name, link, price, "", "Steam", name, 1, "", name, "StatTrak" in name)
            weapon_list.append(weapon)
       
    return weapon_list
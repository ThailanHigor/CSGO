
import requests
from bs4 import BeautifulSoup
from app.models.Weapon import Weapon
import re
import asyncio

async def search_in_NeshaStore(text):

    url = f"http://www.neshastore.com/index.php?route=product/search&\
    sort=p.price&order=DESC&search&search={text}&limit=100&description=true"
    
    weapon_list = []
    pattern = r"([\d,.]+)" 
    
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    productList = soup.find("div", {"class": "product-list"})
    if productList != None:
        items = productList.findChildren("div" , recursive=False) 
       
        for i in items: 
            out_of_stock = i.find("div",{"class":"outofstock"})
            if not out_of_stock:
                imageContainer = i.find("div",{"class":"image"}).find("a")
                link = imageContainer.get("href")
                image = imageContainer.find("img").get("data-src")
                name = i.find("div",{"class":"name"}).getText()
                price = i.find("span",{"class":"price-new"}).getText()
                
             
                price = re.findall(pattern, price)[0]
                
                weapon = Weapon(name, link, price, image, "NeshaStore",name, 1, "Rifle", name, "StatTrak" in name)
                weapon_list.append(weapon)
                
    return weapon_list

import requests
from bs4 import BeautifulSoup
from app.models.Weapon import Weapon
import re

def search_in_BleikStore(text):
    url = f"https://bleikstore.com/index.php?route=product/search&\
    sort=p.price&order=DESC&search={text}&limit=500"
    
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    items = soup.find_all("div", {"class": "product-thumb"})
    
    weapon_list = []
    
    for i in items:
        out_of_stock = i.find(text='Fora de Estoque')
        if not out_of_stock:
            imageContainer = i.find("a",{"class":"product-image"})
            link = imageContainer.get("href")
            image = imageContainer.find("img").get("src")
            
            name = i.find("h4",{"class":"product-name"}).getText()
            price = i.find("p",{"class":"special-price"}).getText()
            
            pattern = r"([\d,.]+)" 
            price = re.findall(pattern, price)[0]
            
            weapon = Weapon(name, link, price, image, "BleikStore",name, 1, "Rifle", name)
            weapon_list.append(weapon)
            
    return weapon_list
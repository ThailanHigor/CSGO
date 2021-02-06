import requests
from bs4 import BeautifulSoup
from app.models.Weapon import Weapon
import re
import asyncio

async def search_in_CSGOStore(text):
    url = f"https://www.csgostore.com.br/buscar?q={text}"
    
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    items = soup.find_all("div", {"class": "listagem-item"})
    
    weapon_list = []
    
    for i in items:
        out_of_stock = i.find("span",{"class":"bandeira-indisponivel"})
        if(out_of_stock == None):
            image = i.find("img",{"class":"imagem-principal"}).get('src')
            link = i.find("a", {"class": "produto-sobrepor"}).get('href')
            name = i.find("a",{"class":"nome-produto"}).getText()
            price = i.find("strong",{"class":"preco-promocional"}).getText().strip()
            
            pattern = r"([\d,.]+)" 
            price = re.findall(pattern, price)[0]
            
            weapon = Weapon(name,link,price,image, "CSGO Store",name, 1, "Rifle", name, "StatTrak" in name)
            weapon_list.append(weapon)
            
    return weapon_list

                                                                                       

from .csgostore import search_in_CSGOStore
from .neshastore import search_in_NeshaStore
from .bleikstore import search_in_BleikStore
from .steam import search_in_Steam
import asyncio
import time

async def search_skin(weapon):
    #print(f"started at {time.strftime('%X')}")
    all_results = []

    GOStore = asyncio.create_task(search_in_CSGOStore(weapon.filterTerm))
    NeshaStore = asyncio.create_task(search_in_NeshaStore(weapon.filterTerm_br))
    BleikStore = asyncio.create_task(search_in_BleikStore(weapon.filterTerm))
    Steam = asyncio.create_task(search_in_Steam(weapon.filterTerm))
    
    all_results.extend(await GOStore)
    all_results.extend(await NeshaStore)
    all_results.extend(await BleikStore)
    all_results.extend(await Steam)
    #print(all_results)
    #print(f"finished at {time.strftime('%X')}")
    print(Steam)
    return all_results
    
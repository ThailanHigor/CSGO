
from .csgostore import search_in_CSGOStore
from .neshastore import search_in_NeshaStore
from .bleikstore import search_in_BleikStore

class Scraping():
    def search_skin(self, text):
        
        all_results = []
    
        GOStore = search_in_CSGOStore(text)
        NeshaStore = search_in_NeshaStore(text)
        BleikStore = search_in_BleikStore(text)
        
        all_results.extend(GOStore)
        all_results.extend(NeshaStore)
        all_results.extend(BleikStore)
    
        return all_results
    

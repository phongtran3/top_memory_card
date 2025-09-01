import { useState, useEffect } from "react";
import axios from 'axios';

import Home from "./pages/Home";
import GameSelect from "./pages/GameSelect";
import CollectionSelect from "./pages/CollectionSelect";
import InGame from "./pages/InGame";
import InCollection from "./pages/InCollection";
import NavBar from "./components/NavBar";
import SettingsDialog from "./components/SettingsDialog";

import kantoStarters from '../src/assets/images/kanto-starters.webp';
import jhotoStarters from '../src/assets/images/jhoto-starters.webp';
import hoennStarters from '../src/assets/images/hoenn-starters.webp';
import sinnohStarters from '../src/assets/images/sinnoh-starters.webp';
import unovaStarters from '../src/assets/images/unova-starters.webp';
import kalosStarters from '../src/assets/images/kalos-starters.webp';
import alolaStarters from '../src/assets/images/alola-starters.webp';
import galarStarters from '../src/assets/images/galar-starters.webp';
import paldeaStarters from '../src/assets/images/paldea-starters.webp';

const PAGES = {
  HOME: 'home',
  GAME_SELECT: 'gameSelect',
  IN_GAME: 'inGame',
  COLLECTION_SELECT: 'collectionSelect',
  IN_COLLECTION: 'inCollection'
}

const genArtWork = {
  gen1: kantoStarters,
  gen2: jhotoStarters,
  gen3: hoennStarters,
  gen4: sinnohStarters,
  gen5: unovaStarters,
  gen6: kalosStarters,
  gen7: alolaStarters,
  gen8: galarStarters,
  gen9: paldeaStarters,
}

//Fetch Local storage
  const getLocalData = (key, fallback = null) => {
    try{
      const storedData = localStorage.getItem(key);
      if(storedData)
        return JSON.parse(storedData);
      else
        localStorage.setItem(key, JSON.stringify(fallback));

    }catch {
      return fallback;
    }
  }

const App = () => {
  const [page, setPage] = useState(PAGES.HOME);
  const [collectionGenId, setCollectionGenId] = useState(0);
  const [playGenId, setPlayGenId] = useState(0);
  const [generationInfo, setGenerationInfo] = useState([])

  const [collectionInfo, setCollectionInfo] = useState(() => {
    return getLocalData("collectionInfo", 
        {
          gen1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
  101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
  111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
  121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
  131, 132, 133, 134, 135, 136, 137, 138, 139, 140,
  141, 142, 143, 144, 145, 146, 147, 148, 149, 150,
  151],
          gen2: [],
          gen3: [],
          gen4: [],
          gen5: [],
          gen6: [],
          gen7: [],
          gen8: [],
          gen9: [],
        }
      )
  })

  getLocalData("levelInfo",
      {
        gen1: 1,
        gen2: 1,
        gen3: 1,
        gen4: 1,
        gen5: 1,
        gen6: 1,
        gen7: 1,
        gen8: 1,
        gen9: 1,
      }
  )

  let componentPage;

  switch (page) {
    case PAGES.HOME: 
      componentPage = <Home setCollectionInfo={setCollectionInfo} pages={PAGES} setPage={setPage}/>
      break;
    case PAGES.GAME_SELECT:
      componentPage = 
      <GameSelect 
        generationInfo={generationInfo} 
        pages={PAGES}
        setPage={setPage}
        setGameId={setPlayGenId}
        />
      break;
    case PAGES.IN_GAME: 
      componentPage = 
        <InGame 
          pages={PAGES} 
          setPage={setPage} 
          genId={playGenId}
          setGenerationInfo={setGenerationInfo}
        />
      break;
    case PAGES.COLLECTION_SELECT:
      componentPage = 
        <CollectionSelect 
          generationInfo={generationInfo} 
          pages={PAGES} 
          setPage={setPage} 
          setCollectionGenId={setCollectionGenId}
        />
      break;
    case PAGES.IN_COLLECTION:
      componentPage = <InCollection setPage={setPage} genId={collectionGenId}/>
      break;
    default:
      componentPage = <Home setPage={setPage}/>

  }

  useEffect(() => {
    const fetchGenerationInfo = async () => {
      try{
        const response = await axios.get("https://pokeapi.co/api/v2/generation");
        let numGeneration = response.data.count
        let array = [];

        for(let i = 0; i< numGeneration; i++){
          const genResponse = await axios.get(`https://pokeapi.co/api/v2/generation/${i+1}`);
          let genCollected = collectionInfo[`gen${i+1}`].length
          let numPokemon = genResponse.data.pokemon_species.length
          let regionName = genResponse.data.main_region.name

          let object = {
            id: genResponse.data.id,
            regionName: regionName.charAt(0).toUpperCase() + regionName.slice(1),
            numPokemon: numPokemon,
            artwork: genArtWork[`gen${i+1}`],
            collected: genCollected,
          }
          array.push(object);
        }
        setGenerationInfo(array);
      } catch (error) {
        console.log(error)
      }
    }
    fetchGenerationInfo();
  }, [collectionInfo])

  console.log(generationInfo);
  console.log(collectionInfo)

  return (
    <div className="app">
      {componentPage}
      {page !== PAGES.HOME && 
      
      <NavBar 
        page={page} 
        pages={PAGES} 
        setPage={setPage} 
        setCollectionInfo={setCollectionInfo}

      />
      }
    </div>
  )
}

export default App

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
  const [generationInfo, setGenerationInfo] = useState([])
  const [collectionInfo, setCollectionInfo] = useState(() => {
    return getLocalData("collectionInfo", 
        {
          gen1: [0,1,2,3,4,5,6,7],
          gen2: [152,153,154,155,156,157,158,158,159,160],
          gen3: [252,253,254,255,256,257,258,259,260],
          gen4: [],
          gen5: [],
          gen6: [],
          gen7: [],
          gen8: [],
          gen9: [],
        }
      )
  })

  

  let componentPage;

  switch (page) {
    case PAGES.HOME: 
      componentPage = <Home setCollectionInfo={setCollectionInfo} pages={PAGES} setPage={setPage}/>
      break;
    case PAGES.GAME_SELECT:
      componentPage = <GameSelect generationInfo={generationInfo} setPage={setPage}/>
      break;
    case PAGES.IN_GAME: 
      componentPage = <InGame setPage={setPage}/>
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
            currentLevel: 0,
            //((genCollected/numPokemon) * 100).toFixed(0)
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

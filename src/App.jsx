import { useState, useEffect } from "react";
import axios from 'axios';

import Home from "./pages/Home";
import GameSelect from "./pages/GameSelect";
import CollectionSelect from "./pages/CollectionSelect";
import InGame from "./pages/InGame";
import InCollection from "./pages/InCollection";
import NavBar from "./components/NavBar";


const PAGES = {
  HOME: 'home',
  GAME_SELECT: 'gameSelect',
  IN_GAME: 'inGame',
  COLLECTION_SELECT: 'collectionSelect',
  IN_COLLECTION: 'inCollection'
}

const genArtWork = {
  gen1: 'gen1',
  gen2: 'gen2',
  gen3: 'gen3',
  gen4: 'gen4',
  gen5: 'gen5',
  gen6: 'gen6',
  gen7: 'gen7',
  gen8: 'gen8',
  gen9: 'gen9',
}


const App = () => {
  const [page, setPage] = useState(PAGES.HOME);
  const [generationInfo, setGenerationInfo] = useState([])

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

  const collectionInfo = getLocalData("collectionInfo", 
    {
      gen1: [0,1,2,3,4,5,6,7],
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
    

  let componentPage;

  switch (page) {
    case PAGES.HOME: 
      componentPage = <Home pages={PAGES} setPage={setPage}/>
      break;
    case PAGES.GAME_SELECT:
      componentPage = <GameSelect generationInfo={generationInfo} setPage={setPage}/>
      break;
    case PAGES.IN_GAME: 
      componentPage = <InGame setPage={setPage}/>
      break;
    case PAGES.COLLECTION_SELECT:
      componentPage = <CollectionSelect generationInfo={generationInfo} setPage={setPage}/>
      break;
    case PAGES.IN_COLLECTION:
      componentPage = <InCollection setPage={setPage}/>
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

          let object = {
            id: genResponse.data.id,
            regionName: genResponse.data.main_region.name,
            numPokemon: numPokemon,
            artwork: genArtWork[`gen${i+1}`],
            collected: ((genCollected/numPokemon) * 100).toFixed(0)
          }

          array.push(object);
        }
        setGenerationInfo(array);
      } catch (error) {
        console.log(error)
      }
    }
    fetchGenerationInfo();
  }, [])

  console.log(generationInfo);
  return (
    <div>
      {componentPage}
      {page !== PAGES.HOME && <NavBar pages={PAGES} setPage={setPage}/>}
    </div>
  )
}

export default App

import {useState} from 'react'
import SettingsDialog from "../components/SettingsDialog";

const Home = ({setPage, pages, setCollectionInfo}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log("Home");
  console.log(pages);


  const handlePlay = () => {
    console.log("handlePlay")
    setPage(pages.GAME_SELECT)
  }
  
  const handleCollection = () => {
    console.log("handleCollection")
    setPage(pages.COLLECTION_SELECT)
  }

  const openSetting = () => {
    console.log("openSetting")
    setIsDialogOpen(true);
  }


  const clearGameData = () => {
    console.log(`clear game data`);
    let collectionInfo = JSON.parse(localStorage.getItem(`collectionInfo`)) || {};
    Object.keys(collectionInfo).forEach(key => {
      collectionInfo[key] = [];
    })
    localStorage.setItem(`collectionInfo`, JSON.stringify(collectionInfo));

    const levelInfo = {
      gen1: 1,
      gen2: 1,
      gen3: 1,
      gen4: 1,
      gen5: 1,
      gen6: 1,
      gen7: 1,
      gen8: 1,
      gen9: 1
    };
    localStorage.setItem(`levelInfo`, JSON.stringify(levelInfo));
    
    setCollectionInfo(collectionInfo);
  }

  return (
    <main>
      <div className="title-section">
        <h1>Pokémon Memory Card League</h1>
      </div>

      <div className="menu">
        <button className='menu-btn' onClick={handlePlay}>Play</button>
        <button className='menu-btn' onClick={handleCollection}>Collections</button>
        <button className='menu-btn' onClick={openSetting} >Settings</button>
      </div>

      <SettingsDialog
        isDialogOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onClear={clearGameData}
      >
      </SettingsDialog>

    </main>
    
  )
}

export default Home

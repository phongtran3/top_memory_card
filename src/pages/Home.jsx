import {useState} from 'react'
import SettingsDialog from "../components/SettingsDialog";
import HomeMenuButton from "../components/HomeMenuButton"

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
    <main className="h-screen flex flex-col bg-[url('./assets/images/pokemon-bg.jpg')] bg-no-repeat bg-cover bg-[80%_100%]">

      <div className="text-center mt-8">
        <h1 className='text-[clamp(1.75rem,5vw,4rem)]' >Pokémon Memory Card League</h1>
      </div>

      <div className="flex flex-grow justify-center items-center" >
        <div className="flex flex-col w-5/6 max-w-sm rounded-lg p-6 m-auto items-center justify-center gap-6 bg-[white]/60 ">
          <HomeMenuButton icon="playing_cards" label={"Play"} onClick={handlePlay}/>
          <HomeMenuButton icon="gallery_thumbnail" label={"Collection"} onClick={handleCollection}/>
          <HomeMenuButton icon="settings" label={"Settings"} onClick={openSetting}/>
        </div>
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

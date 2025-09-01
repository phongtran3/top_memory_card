import React, {useState} from 'react'
import SettingsDialog from './SettingsDialog';

const NavBar = ({page, pages, setPage, setCollectionInfo}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleHome = () => {
    setPage(pages.HOME)
  }

  const handlePlay = () => {
    if(page === pages.GAME_SELECT) return;
    setPage(pages.GAME_SELECT)
  }

   const handleCollection = () => {
    if(page === pages.COLLECTION_SELECT) return;
    setPage(pages.COLLECTION_SELECT)
  }

  const openSetting = () => {
    console.log("openSetting")
    setIsDialogOpen(true);
  }

  //TO-DO - CLEAR LEVELS
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
    setPage(pages.HOME)
  }

  return (
    <>
     <SettingsDialog
            isDialogOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onClear={clearGameData}
      >
      </SettingsDialog>

 
      <nav>
        <ul>
          <li className="nav-item"><button className='nav-btn' onClick={handleHome} >Home</button></li>
          <li className="nav-item"><button className='nav-btn' onClick={handlePlay} >Play</button></li>
          <li className="nav-item"><button className='nav-btn' onClick={handleCollection} >Collection</button></li>
          <li className="nav-item"><button className='nav-btn' onClick={openSetting} >Settings</button></li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar

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

  const clearGameData = () => {
    console.log(`clear game data`);
    let collectionInfo = JSON.parse(localStorage.getItem(`collectionInfo`)) || {};
    Object.keys(collectionInfo).forEach(key => {
      collectionInfo[key] = [];
    })
    localStorage.setItem(`collectionInfo`, JSON.stringify(collectionInfo));
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

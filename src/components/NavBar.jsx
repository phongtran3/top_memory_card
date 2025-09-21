import  {useState} from 'react'
import SettingsDialog from './SettingsDialog';

const NavBar = ({page, pages, setPage, setCollectionInfo}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);



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
      {isMenuOpen && <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>}

      <nav className='text-black p-2 flex justify-end fixed bottom-0 left-0 z-100 w-full'>
        {/*Desktop Links*/}
        <ul className='hidden md:flex'>
          <li className=''>
            <button className='' onClick={handleHome} >
              <span className="material-symbols-outlined">home</span>
            </button>
          </li>

          <li className=''>
            <button className='' onClick={handlePlay} >
              <span className="material-symbols-outlined">playing_cards</span>
            </button>
          </li>

          <li className=''>
            <button className='' onClick={handleCollection} >
              <span className="material-symbols-outlined">gallery_thumbnail</span>
            </button>
          </li>
          <li className=''>
            <button className='' onClick={openSetting} >
              <span className="material-symbols-outlined">settings</span>
            </button>
          </li>
        </ul>

        {/* Hamburger button for mobile */}
        <button 
          className='md:hidden bg-pokemonYellow rounded p-1.5 hover:brightness-90'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 
            <span className='material-symbols-outlined'>close</span>
          : 
            <span className='material-symbols-outlined'>menu</span>
          }
        </button>  



         {/*Mobile */}
        <div 
          className={`fixed right-0 bottom-0 bg-white h-full w-2/3 shadow-lg transform transition-transform duration-300 ease-in-out z-101 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
        >

          <ul className='md:flex h-full '>
            <li className=''>
              <button className='' onClick={handleHome} >
                <span className="material-symbols-outlined">home</span>
              </button>
            </li>

            <li className=''>
              <button className='' onClick={handlePlay} >
                <span className="material-symbols-outlined">playing_cards</span>
              </button>
            </li>

            <li className=''>
              <button className='' onClick={handleCollection} >
                <span className="material-symbols-outlined">gallery_thumbnail</span>
              </button>
            </li>
            <li className=''>
              <button className='' onClick={openSetting} >
                <span className="material-symbols-outlined">settings</span>
              </button>
            </li>

            <button 
              className='md:hidden'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className='material-symbols-outlined'>close</span>
            </button>  

          </ul>

        </div>

      </nav>
    </>
  )
}

export default NavBar

import  {useState} from 'react'
import SettingsDialog from './SettingsDialog';
import NavButtton from './NavButtton';

const NavBar = ({page, pages, setPage, setCollectionInfo}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const handleHome = () => {
    document.body.style.overflow = "";
    setPage(pages.HOME)
  }

  const handlePlay = () => {
    if(page === pages.GAME_SELECT) return;
    document.body.style.overflow = "";
    setIsMenuOpen(false);
    setPage(pages.GAME_SELECT)
  }

   const handleCollection = () => {
    if(page === pages.COLLECTION_SELECT) return;
    document.body.style.overflow = "";
    setIsMenuOpen(false);
    setPage(pages.COLLECTION_SELECT)
  }

  const openSetting = () => {
    setIsDialogOpen(true);
  }

  //TO-DO - CLEAR LEVELS
  const clearGameData = () => {
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
     {isDialogOpen && <SettingsDialog
            isDialogOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onClear={clearGameData}
      >
      </SettingsDialog>}
      
      {isMenuOpen && 
        <div 
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)]" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
        </div>
      }

      <nav className='text-black bottom-0 left-0 fixed z-100 w-full'>
        {/*Desktop Links*/}
        <ul className='hidden md:grid grid-cols-4 divide-x-4 divide-black text-center'>
          <li className=''>
            <NavButtton icon="home" label={"Home"} onClick={handleHome}/>
          </li>

          <li className=''>
            <NavButtton icon="playing_cards" label={"Play"} onClick={handlePlay}/>
          </li>

          <li className=''>
            <NavButtton icon="gallery_thumbnail" label={"Collection"} onClick={handleCollection}/>
          </li>
          <li className=''>
            <NavButtton icon="settings" label={"Settings"} onClick={openSetting}/>
          </li>
        </ul>

        {/* Hamburger button for mobile */}
        <button 
          className='md:hidden float-right m-3 bg-pokemonYellow rounded p-1.5 hover:brightness-90 hover:scale-110'
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
          className={`fixed right-0 bottom-0 bg-white h-full w-3/5 shadow-lg transform transition-transform duration-300 ease-in-out z-101 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
        >

          <ul className='h-full flex flex-col items-end justify-end gap-4 p-4'>
            <li>
              <button className='hover:text-pokemonBlue' onClick={handleHome} >
                <span className="material-symbols-outlined align-middle">home</span> <span className='tracking-widest'>Home</span>
              </button>
            </li>

            <li>
              <button className='hover:text-pokemonBlue' onClick={handlePlay} >
                <span className="material-symbols-outlined align-middle">playing_cards</span> <span className='tracking-widest'>Play</span>
              </button>
            </li>

            <li>
              <button className='hover:text-pokemonBlue' onClick={handleCollection} >
                <span className="material-symbols-outlined align-middle">gallery_thumbnail</span> <span className='tracking-widest'>Collection</span>
              </button>
            </li>
            <li>
              <button className='hover:text-pokemonBlue' onClick={openSetting} >
                <span className="material-symbols-outlined align-middle">settings</span> <span className='tracking-widest'>Settings</span>
              </button>
            </li>

            <button 
              className='hover:text-pokemonRed'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className='material-symbols-outlined align-middle'>close</span>
            </button>  

          </ul>

        </div>

      </nav>
    </>
  )
}

export default NavBar

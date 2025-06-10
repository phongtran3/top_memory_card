import React from 'react'


const NavBar = ({pages, setPage}) => {

  const handleHome = () => {
    setPage(pages.HOME)
  }

  const handlePlay = () => {
    setPage(pages.GAME_SELECT)
  }

   const handleCollection = () => {
    setPage(pages.COLLECTION_SELECT)
  }

  const openSetting = () => {
    console.log("openSetting")
  }

  return (
    <nav>
      <ul>
        <li className="nav-item"><button className='nav-btn' onClick={handleHome} >Home</button></li>
        <li className="nav-item"><button className='nav-btn' onClick={handlePlay} >Play</button></li>
        <li className="nav-item"><button className='nav-btn' onClick={handleCollection} >Collection</button></li>
        <li className="nav-item"><button className='nav-btn' onClick={openSetting} >Settings</button></li>
      </ul>
    </nav>
  )
}

export default NavBar

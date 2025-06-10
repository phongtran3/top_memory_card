

const Home = ({setPage, pages}) => {
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
  }

  const closeSetting = () => {}



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
    </main>
    
  )
}

export default Home

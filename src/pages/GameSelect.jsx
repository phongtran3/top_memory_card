
const GameSelect = ({generationInfo, pages, setPage, setGameId}) => {
  console.log("GameSelect");
	console.log(generationInfo);


  const handleRegionSelect = (genId) => {
      console.log("Generation " + genId)
      setPage(pages.IN_GAME)
		  setGameId(genId);
    }

  return (
    <main className='page-container'>
      <div className="page-header">
        <h2>Select Regoin</h2>
      </div>
      <div className='selection-container'>
        <div className="selection-grid">
          {generationInfo.map((gen) => {
            let prevCollectionPercent;
            
            if(gen.id > 1){
              const prevGenId = gen.id - 1;
              const prevGenInfo = generationInfo[prevGenId - 1];
              prevCollectionPercent = prevGenInfo.collected/prevGenInfo.numPokemon;
              console.log(prevGenInfo);
            }
            
            const isPlayable = gen.id === 1 || prevCollectionPercent >= 0.75;

            return (
              <div 
                className='selection-card' 
                key={gen.id} 
                onClick={() => isPlayable ? handleRegionSelect(gen.id) : null}
              >
                <div className="selection-card-title">
                  <h3>{gen.regionName}</h3>
                </div>

                <div className="selection-card-artwork">
                  <img src={gen.artwork}/>
                </div>

                {gen.id > 1 && prevCollectionPercent < .75 ?
                  <p>
                    Collect 75% of previoous region to unlock
                  </p>
                  :
                   <div className="selection-card-stats">
                  <p className='collected'>{gen.collected} / {gen.numPokemon}</p>
                  <p className="percent-collected">{((gen.collected/gen.numPokemon) * 100).toFixed(0)}% collected</p>
                </div>
                }
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default GameSelect

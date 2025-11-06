
const GameSelect = ({generationInfo, pages, setPage, setGameId}) => {
  console.log("GameSelect");
	console.log(generationInfo);


  const handleRegionSelect = (genId) => {
      console.log("Generation " + genId)
		  setGameId(genId);
      setPage(pages.IN_GAME)
    }

  return (
    <main className='page-container bg-warmBackground md:pb-16'>

      <div className="page-header p-4">
        <h2 className="text-3xl text-center">Select Regoin</h2>
      </div>

      <div className='selection-container p-4 max-w-6xl m-auto'>
        <div className="selection-grid flex flex-wrap gap-4">
          {generationInfo.map((gen) => {
            let prevCollectionPercent;
            
            if(gen.id > 1){
              const prevGenId = gen.id - 1;
              const prevGenInfo = generationInfo[prevGenId - 1];
              prevCollectionPercent = prevGenInfo.collected/prevGenInfo.numPokemon;
            }
            
            const isPlayable = gen.id === 1 || prevCollectionPercent >= 0.75;

            return (
              <div 
                className={`selection-card flex flex-col justify-center items-center gap-2 w-full p-4 
                border-2 border-solid rounded-2xl shadow-xl/20 
                sm:w-[calc(50%-0.5rem)] lg:w-[calc(33%-0.5rem)]
                ${isPlayable ? 'bg-white cursor-pointer hover:border-blue-500 hover:rotate-[1deg] origin-right transition-transform duration-200 ' : 'cursor-not-allowed opacity-80 bg-[#6d6d6d]'}`}

                key={gen.id} 
                onClick={() => isPlayable ? handleRegionSelect(gen.id) : null}
              >
                <div className="selection-card-title ">
                  <h3 className="text-2xl">{gen.regionName}</h3>
                </div>

                <div className="selection-card-artwork aspect-[4/3] w-full overflow-hidden">
                  <img className="w-full h-full object-contain" src={gen.artwork}/>
                </div>

                {gen.id > 1 && prevCollectionPercent < .75 ?
                  <p className="px-2">
                    Collect 75% of previoous region to unlock
                  </p>
                  :
                   <div className="selection-card-stats w-full flex flex-col items-center gap-2">
                  <p className='collected'>{gen.collected} / {gen.numPokemon}</p>
                  <p className="percent-collected">{((gen.collected/gen.numPokemon) * 100).toFixed(0)}% Collected</p>
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

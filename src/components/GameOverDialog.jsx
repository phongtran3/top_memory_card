//textFlag 1 = win, 0 = lost
const GameOverDialog = ({setPage, pages, resetGame, nextGame, gameOverFlag}) => {
  
  const handleNextPlay = () =>{
    gameOverFlag ? nextGame() : resetGame();
  }

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50'>
      <div className="game-over-containe p-4 mx-4 rounded-lg bg-[white] max-w-112 flex flex-col gap-4">
        <div className="game-over-text text-center">
          {gameOverFlag === 1 ? 
            <p>Congrats! You collected all the cards from this round!</p>
            :
            <>
              <p>Game Over... </p>
              <p>No cards was collected this time.</p>
            </>
          }
        </div>
        <div className="btn-container flex mt-4 gap-4 flex-col">
          <button
            className="bg-pokemonYellow py-2 px-4 rounded-md hover:text-pokemonBlue" 
            onClick={() => handleNextPlay()}
          >
            {gameOverFlag ? "Next Round" : "Try Again"}
          </button>

          <button
            className="bg-pokemonYellow py-2 px-4 rounded-md hover:text-pokemonBlue" 
            onClick={() => setPage(pages.GAME_SELECT)}
          >
            Region Selection
          </button>

          <button
            className="bg-pokemonYellow py-2 px-4 rounded-md hover:text-pokemonBlue" 
            onClick={() => setPage(pages.COLLECTION_SELECT)}
          >
            Collection
          </button>

          <button
            className="bg-pokemonYellow py-2 px-4 rounded-md hover:text-pokemonBlue" 
            onClick={() => setPage(pages.HOME)}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOverDialog

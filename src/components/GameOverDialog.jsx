//textFlag 1 = win, 0 = lost
const GameOverDialog = ({setPage, pages, resetGame, nextGame, gameOverFlag}) => {
  
  const handleNextPlay = () =>{
    gameOverFlag ? nextGame() : resetGame();
  }

  return (
    <div>
      <div className="game-over-container">
        <div className="game-over-text">
          {gameOverFlag === 1 ? 
            <p>Congrats! You collected all the cards from this round!</p>
            :
            <p>Game Over... No cards was collected this time.</p>
          }
        </div>
        <div className="btn-container">
          <button className="game-over-btn" onClick={() => handleNextPlay()}>
            {gameOverFlag ? "Next Round" : "Try Again"}
          </button>
          <button className="game-over-btn" onClick={() => setPage(pages.GAME_SELECT)}>Region Selection</button>
          <button className="game-over-btn" onClick={() => setPage(pages.COLLECTION_SELECT)}>Collection</button>
          <button className="game-over-btn" onClick={() => setPage(pages.HOME)}>Home</button>
        </div>
      </div>
    </div>
  )
}

export default GameOverDialog

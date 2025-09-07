import React, { useState, useEffect } from 'react'
import GameOverDialog from '../components/gameOverDialog';
import axios from 'axios';


const fisherYatesShuffle = (array, count = 9) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

const InGame = ({genId, setPage, pages, setGenerationInfo}) => {

  const collectedPokemons = JSON.parse(localStorage.getItem('collectionInfo'))
  const collectedPokemonSet = new Set(collectedPokemons[`gen${genId}`])

  const storedLevel = JSON.parse(localStorage.getItem('levelInfo'));
  const [currentLevel, setCurrentLevel] = useState(() => {
    return storedLevel[`gen${genId}`] || 1;
  })


  const [collecting, setCollecting] = useState(new Set());
  const [notCollected, setNotCollected] = useState([]);
  const [displayedSet, setDisplayedSet] = useState([]);
  const [cardsRemaining, setCardsRemaining] = useState(9)
  const [gameOver, setGameOver] = useState(false);
  const [gameOverFlag, setGameOverFlag] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    let isMounted = true;

    const fetchCollection = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/generation/${genId}`);

        const pokemonIdArray = response.data.pokemon_species.map(pokemon => 
          Number(pokemon.url.split("/").filter(Boolean).pop())
        );

        const promise = pokemonIdArray.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
        const result = await Promise.all(promise);

        const pokemons = result.map(res => {
          return {
            id: res.data.id,
            name: res.data.name,
            artworkUrl: res.data.sprites?.other?.['official-artwork']?.front_default || "",   
          }

        }).filter(el => !collectedPokemonSet.has(el.id))

        const initalDisplayedSet = fisherYatesShuffle(pokemons, 9)
        
        if (isMounted) {
          setNotCollected(pokemons);
          setDisplayedSet(initalDisplayedSet)
          setCardsRemaining(Math.min(initalDisplayedSet.length, 9))
          setLoading(false);
        }
      }catch (error){
        console.error("Failed to fetch collection:", error);
      }
    }
    if(collectedPokemonSet.size < 151)
      fetchCollection();

    return () => {
      isMounted = false; // cleanup
    };
  }, []) //On inital page load

  const handleCardSelect = (pokemonID) => {
    setCardsRemaining(prev => prev- 1);

    if(isInCollection(pokemonID)){
        setGameOver(true);
        setGameOverFlag(0);
    }else {
      setCollecting(prev => new Set(prev).add(pokemonID));
      if(cardsRemaining - 1 === 0){
          //display pop up for next round
          setGameOver(true);
          setGameOverFlag(1);
      }else {
        //reshuffle cards displayed
        setDisplayedSet(fisherYatesShuffle(displayedSet))
      }
    }
  }

  const isInCollection = (pokemonID) => collecting.has(pokemonID);

  const resetGame = () =>{
      setCollecting(new Set());
      setCardsRemaining(9);
      setDisplayedSet(fisherYatesShuffle(displayedSet))
      setGameOver(false);
      setGameOverFlag(0);
  }
  
  useEffect(() => {
    if (!gameOver) return;

    console.log("Game Over")
      //update local storage array to include new set of pokemons
      const updatedCollection = {
        ...collectedPokemons,
        [`gen${genId}`]: [
          ...(collectedPokemons[`gen${genId}`]),
          ...collecting
        ]
      }

      localStorage.setItem('collectionInfo', JSON.stringify(updatedCollection))

      const updatedLevel = {
        ...storedLevel,
        [`gen${genId}`]: storedLevel[`gen${genId}`] + 1,
      }
      console.log(updatedLevel);
      localStorage.setItem(`levelInfo`, JSON.stringify(updatedLevel))

      setGenerationInfo(prev => 
        prev.map(gen => 
          gen.id === genId ? {...gen, collected: updatedCollection[`gen${genId}`].length} : gen
        )
      )
  }, [gameOver])

  const nextGame = () => {
      const filtered = notCollected.filter(el => !displayedSet.includes(el));
      setNotCollected(filtered);
      setDisplayedSet(fisherYatesShuffle(filtered, 9));

      setCollecting(new Set());
      setCardsRemaining(9);
      setGameOver(false);
      setGameOverFlag(0);
      setCurrentLevel(prev => prev + 1);

  }

  return (
    <main className='page-container'>
      {collectedPokemonSet.size === 151 ?
      <>
        <h2>Collection Completed!</h2>
        <p>Proceed to next region and collect new pokemons!</p>
      </>
        :
      <>
        

        {gameOver && 
          <GameOverDialog 
            setPage={setPage}
            pages={pages}
            resetGame={resetGame}
            gameOverFlag={gameOverFlag}
            nextGame={nextGame}
          />
        }
        
        <div className="game-container">
          {loading ? 
              <div className='game-loader'>
                Loading
              </div>
            :
            <>
              <div className="game-header">
                <p>{cardsRemaining} cards remaining</p>
                <p>Level {currentLevel}</p>
              </div>
              <div className="game-card-grid">
                {displayedSet.map((pokemon) => {
                  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                  return (
                    <div 
                      className="game-card" 
                      onClick={!gameOver ? () => handleCardSelect(pokemon.id) : undefined}
                      key={pokemon.id}
                    >
                      <div className="game-card-artwork">
                        <img src={pokemon.artworkUrl}/>
                      </div>

                      <div className="game-card-title">
                        <h3>{pokemonName}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          }
        </div>
      </>
      }
      
    </main>
  )
}

export default InGame

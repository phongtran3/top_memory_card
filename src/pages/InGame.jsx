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
  console.log("InGame");
  console.log("gen id " + genId);

  const collectedPokemons = JSON.parse(localStorage.getItem('collectionInfo'))
  const collectedPokemonSet = new Set(collectedPokemons[`gen${genId}`])
  
  const [currentLevel, setCurrentLevel] = useState(() => {
    return parseInt(localStorage.getItem(`currentLevel`)) || 1;
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
            artworkUrl: res.data.sprites.other['official-artwork'].front_default,   
          }
        }).filter(el => !collectedPokemonSet.has(el.id))

        const initalDisplayedSet = fisherYatesShuffle(pokemons, 9)
        
        if (isMounted) {
          setNotCollected(pokemons);
          setDisplayedSet(initalDisplayedSet)
          setLoading(false);
        }
      }catch (error){
        console.error("Failed to fetch collection:", error);
      }
    }

    fetchCollection();
    return () => {
      isMounted = false; // cleanup
    };
  }, []) //On inital page load

  const handleCardSelect = (pokemonID) => {
    setCardsRemaining(prev => {
      let newValue = prev - 1;

      if(isInCollection(pokemonID)){
        console.log("In Collection")
        setGameOver(true);
        setGameOverFlag(0);
        return prev;
      }else{
        console.log("Not in collection")
        setCollecting(prev => new Set(prev).add(pokemonID));
        if(newValue === 0){
          //display pop up for next round
          setGameOver(true);
          setGameOverFlag(1);
        }else {
          //reshuffle cards displayed
          //setDisplayedSet(fisherYatesShuffle(displayedSet))
        }
        return newValue;
      }

    })
  }

  const isInCollection = (pokemonID) => collecting.has(pokemonID);

  // let object = {
  //   id: genResponse.data.id,
  //   regionName: regionName.charAt(0).toUpperCase() + regionName.slice(1),
  //   numPokemon: numPokemon,
  //   artwork: genArtWork[`gen${i+1}`],
  //   collected: genCollected,
  //   currentLevel: 0,
  //   ((genCollected/numPokemon) * 100).toFixed(0)
  // }

  const resetGame = () =>{
      setCollecting(new Set());
      setCardsRemaining(9);
      setDisplayedSet(fisherYatesShuffle(displayedSet))
      setGameOver(false);
      setGameOverFlag(0);
  }

//   setNotCollected(prev => {
//   const filtered = prev.filter(el => !displayedSet.includes(el));
//   setDisplayedSet(fisherYatesShuffle(filtered, 9));
//   return filtered;
// });


  const nextGame = () => {
    //update local storage array to include new set of pokemons
      collectedPokemons[`gen${genId}`] = [
        ...(collectedPokemons[`gen${genId}`]),
        ...collecting
      ];
      localStorage.setItem('collectionInfo', JSON.stringify(collectedPokemons))
      localStorage.setItem(`currentLevel`, currentLevel + 1)
      console.log(collectedPokemons[`gen${genId}`].length);
      

      const filtered = notCollected.filter(el => !displayedSet.includes(el));
      setNotCollected(filtered);
      setDisplayedSet(fisherYatesShuffle(filtered, 9));

      setCollecting(new Set());
      setCardsRemaining(9);
      setGameOver(false);
      setGameOverFlag(0);
      setCurrentLevel(prev => prev + 1);

      setGenerationInfo(prev => 
        prev.map(gen => 
          gen.id === genId ? {...gen, collected: collectedPokemons[`gen${genId}`].length} : gen
        )
      )

  }

  console.log("current level " + currentLevel);
  console.log(notCollected);
  console.log(collectedPokemons[`gen${genId}`]);
  console.log(displayedSet);
  console.log(collecting);
  
  return (
    <main className='page-container'>
      <div className="game-header">
        <p>{cardsRemaining} cards remaining</p>
        <p>Level {currentLevel}</p>
      </div>
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
          <div className="game-card-grid">
            {displayedSet.map((pokemon) => {
              const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
              return (
                <div className="game-card" onClick={!gameOver ? () => handleCardSelect(pokemon.id) : undefined}>
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
        }
      </div>
    </main>
  )
}

export default InGame

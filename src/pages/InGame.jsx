import React, { useState, useEffect } from 'react'
import axios from 'axios';


const fisherYatesShuffle = (array, count = 9) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

const InGame = ({genId}) => {
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
  const [loading, setLoading] = useState(true);

  /*
    On load
    1. Fetch region's pokedex/collection
      - Filter it out by pokemons not collected yet
      - end result = non collected pokemons
    2. useState for current level - grab from localstorage 
      - useState for number of remaining cards
      - useState for current array of cards displayed

    On card click/selection 
    1. 
  

  */

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
    if(isInCollection(pokemonID)){
      console.log("In Collection")
      setCollecting(new Set());
      setCardsRemaining(9);
      setDisplayedSet(fisherYatesShuffle(displayedSet))
    }
    else{
      console.log("Not in collection")
      setCollecting(prev => new Set(prev).add(pokemonID));

      //If equal, all cards have been collected
      if(collecting.size === notCollected.length){
        //display pop up for next round
        
      }else {
        //update cards remaining
        //reshuffle cards displayed
        setCardsRemaining(prev => prev - 1);
        setDisplayedSet(fisherYatesShuffle(displayedSet))
      }
    }


  }

  const isInCollection = (pokemonID) => collecting.has(pokemonID);




  console.log("current level " + currentLevel);
  console.log(notCollected);
  console.log(displayedSet);
  
  return (
    <main className='page-container'>
      <div className="game-header">
        {cardsRemaining} cards remaining
      </div>
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
                <div className="game-card" onClick={() => handleCardSelect(pokemon.id)}>
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

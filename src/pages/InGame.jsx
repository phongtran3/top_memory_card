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
  const [notCollected, setNotCollected] = useState([]);
  const [displayedSet, setDisplayedSet] = useState([]);
  const [cardsRemaining, setCardsRemaining] = useState(9)
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
  }, [])


  console.log("current level " + currentLevel);
  console.log(notCollected);
  console.log(displayedSet);
  
  return (
    <div>
      
    </div>
  )
}

export default InGame

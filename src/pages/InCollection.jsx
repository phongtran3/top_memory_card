import React, {useEffect, useState} from 'react'
import axios from 'axios';

const statMap = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  'speed': 'Speed'
};

const InCollection = ({genId}) => {
  const [collection, setCollection] = useState({});
  const [loading, setLoading] = useState(true);
  const [cardOpen, setCardOpen] = useState(false);

  const currCollection = JSON.parse(localStorage.getItem('collectionInfo'))
  const currCollectionSet = new Set(currCollection[`gen${genId}`])
  console.log(currCollectionSet);
  
  useEffect(() => {
    let isMounted = true;

    const fetchCollection = async () => {
      console.log("In Collection useEffect")
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/generation/${genId}`);

        const pokemonIdArray = response.data.pokemon_species.map(pokemon => 
          Number(pokemon.url.split("/").filter(Boolean).pop())
        );

        const promise = pokemonIdArray.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
        const result = await Promise.all(promise);

        const pokemons = result.map(res => {
          const typeArray = res.data.types.map(t => 
            t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
          );

          const statsArray = res.data.stats.map(stat => {
            return {
              baseStat: stat.base_stat,
              statName : statMap[stat.stat.name] || stat.stat.name,
            }
          })

          return {
            id: res.data.id,
            name: res.data.name,
            artworkUrl: res.data.sprites.other['official-artwork'].front_default,
            stats: statsArray,
            types: typeArray,
          }
          
        }).sort((a,b) => a.id - b.id);

        if (isMounted) {
          setCollection(pokemons);
          setLoading(false);
        }
        
      } catch(error) {
        console.error("Failed to fetch collection:", error);
      }
    }

    fetchCollection();

    return () => {
      isMounted = false; // cleanup
    };
  }, [])

  console.log(collection);
  return (
    <main className='page-container'>
      <div className="page-header">
        <h2>Generation {genId} Pokémon</h2>
      </div>
      <div className="collection-container">
        {loading ? 
            <div className='collection-loader'>
              Loading
            </div>
          :
            <div className='collection-grid'>
              {collection.map((pokemon) => {
                const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                return (
                  <div className="collection-card" key={pokemon.id}>
                    {currCollectionSet.has(pokemon.id) ? 
                      <>
                        <div className="collection-card-header">
                          <h3>#{pokemon.id} {pokemonName}</h3>
                        </div>

                        <div className="collection-card-img">
                          <img src={pokemon.artworkUrl}/>
                        </div>

                        <div className="data-container">
                          <div className="type-container">
                            {pokemon.types.map((type,index) => {
                              return (
                              <span> {type}{index < pokemon.types.length - 1 ? ' · ' : ''}</span>
                              )
                            })}
                          </div>
                          <div className="stats-container">
                            {pokemon.stats.map((stat) => {
                              return (
                                <p>{stat.statName} {stat.baseStat}</p>
                              )
                            })}

                          </div>
                        </div>
                      </> :
                      <>
                        <h3>#{pokemon.id}</h3>
                      </>
                    }
                  </div>
                )
              })}
            </div>
          }
      </div>
    
   
    </main>
  )
}

export default InCollection

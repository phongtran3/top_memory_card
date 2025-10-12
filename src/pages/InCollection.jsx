import {useEffect, useState} from 'react'
import axios from 'axios';
import CollectionCard from '../components/CollectionCard';

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
    <main className='page-container md:pb-20'>

      <div className="page-header p-4">
        <h2 className='text-3xl text-center '>Generation {genId} Pokémon</h2>
      </div>

      <div className="collection-container max-w-6xl mt-6 m-auto p-1">
        {loading ? 
            <div className='collection-loader text-center flex flex-col items-center gap-8'>
              <div class="loader"></div>
              <img src="https://i.gifer.com/5FBP.gif" class="loading-gif" alt="loading pokemon GIF of red and pikachu" />
            </div>
          :
            <div className='collection-grid grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-4'>
              {collection.map((pokemon) => 
                <CollectionCard key={pokemon.id} pokemon={pokemon} currCollectionSet={currCollectionSet}/>
              )}
            </div>
          }
      </div>
    
   
    </main>
  )
}

export default InCollection

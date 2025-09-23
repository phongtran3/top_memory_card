import {useState} from 'react'
// import { useMediaQuery } from "react-responsive";


//On big screen - need to create a dialog instead of expanding like an accordion

const CollectionCard = ({pokemon, currCollectionSet}) => {
  const [cardOpen, setCardOpen] = useState(false);
  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  // const isMobile = useMediaQuery({ maxWidth: 500 });

  const handleShowMore = () => {
    setCardOpen(true);
  }

  const handleClose = () => {
    setCardOpen(false);
  }

  return (
    <div className="collection-card">
         {currCollectionSet.has(pokemon.id) ? 
            <>
              <div className="collection-card-header">
                <h3>#{pokemon.id} {pokemonName}</h3>
              </div>

              <div className="collection-card-img">
                <img src={pokemon.artworkUrl}/>
              </div>

              {cardOpen ? 
                
                <div className="data-container">
                  <button className="close-btn" onClick={() => handleClose()}>X</button>

                  <div className="type-container">
                    {pokemon.types.map((type,index) => {
                      return (
                      <span key={type}> {type}{index < pokemon.types.length - 1 ? ' · ' : ''}</span>
                      )
                    })}
                  </div>

                  <div className="stats-container">
                    {pokemon.stats.map((stat) => {
                      return (
                        <p key={stat.stateName}>{stat.statName} {stat.baseStat}</p>
                      )
                    })}

                  </div>
                </div>
                
                :
                <div className="show-more">
                  <button 
                    className="show-more-btn"
                    onClick={() => handleShowMore()}
                  >
                      Show More
                  </button>
                </div>
              }
              
              
            </> 
            :

            <>
              <h3>#{pokemon.id}</h3>
            </>
          }  

    </div>
  )
}

export default CollectionCard

import {useState, useEffect} from 'react'

const CollectionCard = ({pokemon, currCollectionSet}) => {
  const [cardOpen, setCardOpen] = useState(false);
  const [oldPos, setOldPos] = useState(null);
  const [clickedTarget, setClickedTarget] = useState();

  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  const handleShowMore = (e) => {
    const currentTarget = e.target.parentElement.parentElement;
    setCardOpen(prev => !prev);
    setClickedTarget(currentTarget);

    if(!cardOpen){
      setOldPos(() => currentTarget.getBoundingClientRect());
    }
  }

  const getBarColor = (stat) => {
    switch (true) {
      case stat >= 1 && stat <= 29:
        return '#f34444'; // Very Bad
      case stat >= 30 && stat <= 59:
        return '#ff7f0f'; // Bad
      case stat >= 60 && stat <= 89:
        return '#ffdd57'; // Bad - Mediocre
      case stat >= 90 && stat <= 119:
        return '#a0e515'; // Decent - Good
      case stat >= 120 && stat <= 149:
        return '#23cd5e'; // Very Good
      case stat >= 150 && stat <= 255:
        return '#00c2b8'; // Phenomenal
      default:
        return '#000000';
    }
  }

  useEffect(() => {
    if(cardOpen) {
      document.body.style.overflow = "hidden";
      const rect = clickedTarget.getBoundingClientRect();

      clickedTarget.style.position = "fixed";
      clickedTarget.style.top = `${rect.top}px`;
      clickedTarget.style.left = `${rect.left}px`;
      clickedTarget.style.width = `${rect.width}px`;
      clickedTarget.style.height = `${rect.height}px`;
      clickedTarget.style.transition = "all 1.5s ease";

      setTimeout(() => {
        clickedTarget.style.zIndex = "1001";
        clickedTarget.style.top = "45%";
        clickedTarget.style.left = "50%";
        clickedTarget.style.width = "90%";
        clickedTarget.style.maxWidth = "700px";
        clickedTarget.style.height = "auto";
        clickedTarget.style.border = "4px solid black";
        clickedTarget.style.transform = "translate(-50%, -50%) rotateY(360deg)";
      }, 0);

    } else if (!cardOpen && clickedTarget) {
      const oldRect = oldPos;
      const rect = clickedTarget.getBoundingClientRect();

      clickedTarget.style.position = "fixed";
      clickedTarget.style.top = `${rect.top}px`;
      clickedTarget.style.left = `${rect.left}px`;
      clickedTarget.style.width = `${rect.width}px`;
      clickedTarget.style.height = `${rect.height}px`;
      clickedTarget.style.transition = "all 1.5s ease";

      setTimeout(() => {
        clickedTarget.style.zIndex = "1";
        clickedTarget.style.top = `${oldRect.top}px`;
        clickedTarget.style.left = `${oldRect.left}px`;
        clickedTarget.style.width = `${oldRect.width}px`;
        clickedTarget.style.height = `${oldRect.height}px`;
        clickedTarget.style.border = "";
        clickedTarget.style.transform = "none";
      }, 0);

      clickedTarget.addEventListener(
        "transitionend",
        () => {
          [
            "position",
            "top",
            "left",
            "width",
            "height",
            "transition",
            "transform",
            "z-index",
            "max-width",
          ].forEach((prop) => clickedTarget.style.removeProperty(prop));
          setClickedTarget(null);
          document.body.style.overflow = "";
        },
        { once: true }
      );

    }
  }, [clickedTarget, cardOpen, oldPos])


  return (
    <>
    {cardOpen && <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] "></div>}
      
    <div className="collection-card flex flex-col items-center justify-center p-4 min-h-[275px]  border-solid rounded-lg bg-[#F5F7FA]">
         {currCollectionSet.has(pokemon.id) ? 
            <>
              
              <div className="collection-card-header text-center">
                <h3>#{pokemon.id} {pokemonName}</h3>
              </div>

              <div className="collection-card-img">
                <img src={pokemon.artworkUrl}/>
              </div>

              {cardOpen ? 
                
                <div className="data-container w-full">
                  {cardOpen && 
                    <button 
                      className="close-btn absolute top-2 right-4 hover:text-pokemonRed" 
                      onClick={(e) => handleShowMore(e)}
                    >X
                    </button>
                  }
                  <div className="type-container text-center align-middle mb-2">
                    {pokemon.types.map((type,index) => {
                      return (
                      <span key={type}> {type}{index < pokemon.types.length - 1 ? ' · ' : ''}</span>
                      )
                    })}
                  </div>

                  <table className="table-auto w-full ">
                    <tbody>
                      {pokemon.stats.map((stat) => {
                        const barWidth = ((stat.baseStat / 255) * 100).toFixed(2)
                        const barColor = getBarColor(stat.baseStat);
                        return (
                            <tr>
                              <td className='p-1 text-left whitespace-nowrap' >{stat.statName}</td>
                              <td className='p-1 text-right whitespace-nowrap' >{stat.baseStat}</td>
                              <td className='p-1 w-full'>
                                <div  
                                  className={`h-4 p-1 rounded-sm border border-black/60`}
                                  style={{
                                    width: `${barWidth}%`,
                                    backgroundColor: `${barColor}`
                                  }}>
                                </div>
                              </td>
                            </tr>
                        )

                      })}
                    </tbody>
                  </table>
                </div>
                :
                <div className="show-more mt-2">
                  <button 
                    className="show-more-btn bg-pokemonYellow py-2 px-4 rounded-md hover:text-pokemonBlue"
                    onClick={(e) => handleShowMore(e)}
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
    </>

  )
}

export default CollectionCard

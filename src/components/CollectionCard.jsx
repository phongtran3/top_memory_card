import {useState, useEffect} from 'react'
// import { useMediaQuery } from "react-responsive";


//On big screen - need to create a dialog instead of expanding like an accordion

const CollectionCard = ({pokemon, currCollectionSet}) => {
  const [cardOpen, setCardOpen] = useState(false);
  
  const [oldPos, setOldPos] = useState(null);
  const [clickedTarget, setClickedTarget] = useState();

  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  // const isMobile = useMediaQuery({ maxWidth: 500 });

  const handleShowMore = (e) => {
    const currentTarget = e.target.parentElement.parentElement;
    console.log(currentTarget);
    setCardOpen(prev => !prev);
    setClickedTarget(currentTarget);
    console.log(currentTarget.getBoundingClientRect());

    if(!cardOpen){
      setOldPos(() => currentTarget.getBoundingClientRect());
    }


  }

  const handleClose = () => {
    setCardOpen(false);
  }

  useEffect(() => {
    console.log("useEffect")
    if(cardOpen) {
      console.log("Showing more details...")
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
      console.log("Closing details...")
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
      
    <div className="collection-card flex flex-col items-center justify-center p-4 min-h-[275px]  border-solid rounded-lg bg-white">
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
                  {cardOpen && 
                    <button 
                      className="close-btn absolute top-2 right-4 hover:text-pokemonRed" 
                      onClick={(e) => handleShowMore(e)}
                    >X
                    </button>
                  }
                  <div className="type-container align-middle mb-2">
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

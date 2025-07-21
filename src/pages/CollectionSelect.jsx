import React, {useState} from 'react'
import FullCollection from '../components/FullCollection'

const CollectionSelect = ({generationInfo, pages, setPage, setCollectionGenId}) => {
	const [inCollection, setInCollection] = useState(false);

  console.log("CollectionSelect");
	console.log(generationInfo);

	const handleCollectionSelect = (genId) => {
		console.log("Generation " + genId)
		//setInCollection(true);
		setPage(pages.IN_COLLECTION)
		setCollectionGenId(genId);
	}

	return (
		<main className='page-container'>
			{inCollection ? <FullCollection /> : 
			<>
				<div className="page-header">
					<h2>Collection</h2>
				</div>
				<div className='selection-container'>
					<div className="selection-grid">
						{generationInfo.map((gen) => {
							return (
								<div className='selection-card' key={gen.id} onClick={() => handleCollectionSelect(gen.id)}>
									<div className="selection-card-title">
										<h3>{gen.regionName}</h3>
									</div>

									<div className="selection-card-artwork">
										<img src={gen.artwork}/>
									</div>

									<div className="selection-card-stats">
										<p className='collected'>{gen.collected} / {gen.numPokemon}</p>
										<p className="percent-collected">{((gen.collected/gen.numPokemon) * 100).toFixed(0)}% collected</p>
									</div>

								</div>
							)
						})}
					</div>
				</div>
			</>
			}
		</main>
	)
}

export default CollectionSelect

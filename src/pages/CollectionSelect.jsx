
const CollectionSelect = ({generationInfo, pages, setPage, setCollectionGenId}) => {
  console.log("CollectionSelect");
	console.log(generationInfo);

	const handleCollectionSelect = (genId) => {
		console.log("Generation " + genId)
		//setInCollection(true);
		setPage(pages.IN_COLLECTION)
		setCollectionGenId(genId);
	}

	return (
		<main className='page-container bg-warmBackground md:pb-16'>

				<div className="page-header p-4">
					<h1 className="text-3xl text-center">Collection</h1>
				</div>

				<div className='selection-container p-4 max-w-6xl m-auto'>

					<div className="selection-grid flex flex-wrap gap-4">

						{generationInfo.map((gen) => {
							return (
								<div 
									className='selection-card flex flex-col justify-center items-center gap-2 w-full p-4 border-solid border-2 cursor-pointer rounded-2xl shadow-xl/20 bg-[white] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33%-0.5rem)]
									hover:border-blue-500 hover:rotate-[1deg] origin-right transition-transform duration-200 ' 
									key={gen.id} 
									onClick={() => handleCollectionSelect(gen.id)}
								>
									<div className="selection-card-title">
										<h3 className="text-2xl">{gen.regionName}</h3>
									</div>

									<div className="selection-card-artwork aspect-[4/3] w-full overflow-hidden">
										<img className="w-full h-full object-contain" src={gen.artwork}/>
									</div>

									<div className="selection-card-stats w-full flex flex-col items-center gap-2">
										<p className='collected'>{gen.collected} / {gen.numPokemon}</p>
										<p className="percent-collected">{((gen.collected/gen.numPokemon) * 100).toFixed(0)}% Collected</p>
									</div>

								</div>
							)
						})}
					</div>
				</div>
		</main>
	)
}

export default CollectionSelect

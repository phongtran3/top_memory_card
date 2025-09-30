const HomeMenuButton = ({icon, label, onClick}) => {
  return (
    <button 
      className='bg-pokemonYellow w-full py-2 rounded-md hover:text-pokemonBlue' 
      onClick={onClick}
    >
      <span className="material-symbols-outlined align-middle">{icon}</span> <span className='tracking-widest'>{label}</span>
    </button>
  )
}

export default HomeMenuButton

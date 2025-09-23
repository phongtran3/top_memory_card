const NavButtton = ({icon, label, onClick}) => {
  return (
    <button className='flex flex-col w-full p-2 border-t-2 bg-pokemonYellow hover:brightness-90 hover:text-pokemonBlue' onClick={onClick} >
      <span className="material-symbols-outlined ">{icon}</span><span className="tracking-widest">{label}</span>
    </button>
  )
}

export default NavButtton

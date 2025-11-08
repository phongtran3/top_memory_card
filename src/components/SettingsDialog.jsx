import {useState} from 'react'

const SettingsDialog = ({isDialogOpen, onClose, onClear}) => {
  const [isConfirm, setIsConfirm] = useState(false);
  if(!isDialogOpen) return null;

  
  const handleOnClear = () => {
    if(!isConfirm) {
      setIsConfirm(true);
      return;
    }
    onClear();
    setIsConfirm(false);
    onClose()
  }

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
      <div className="p-4 mx-4 rounded-lg bg-[white] max-w-112 flex flex-col gap-4">
        <div>
          <h1 className='text-xl'>Settings</h1>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className='text-xl'>Rule</h2>
          <p>Collect all the unique cards while avoiding duplicates. Once you have selected all the unique cards, you will advance to the next level. </p>
        </div>

        <div className="flex mt-4 gap-4 flex-col">
          {isConfirm && <p>Warning! Clearing game data will reset all your game's progress. If you wish to proceed, click the button again.</p>}

          <button 
            className="bg-pokemonYellow py-2 px-4 rounded-md hover:text-pokemonBlue" 
            onClick={handleOnClear}
          >
            Clear Game Data
          </button>

          <button 
            className="bg-pokemonYellow py-2 px-4 rounded-md hover:text-pokemonBlue" 
            onClick={() => {
              setIsConfirm(false)  
              onClose()
            }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

export default SettingsDialog

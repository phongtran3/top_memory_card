import React, {useState} from 'react'




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
    <div className='dialog-container'>
      <div 
        className="dialog"

        
      >
        <div className="dialog-header">
          <h1>Settings</h1>
        </div>

        <div className="rules-container">
          <h3>Rule</h3>
          <p>Collect all the unique cards while avoiding duplicates. Once you've selected all the unique cards, you'll advance to the next level</p>
        </div>


        <div className="button-container">
          {isConfirm && <p>Warning! Clearing game data will reset all your game's progress. If you wish to proceed click the button again.</p>}
          <button className="clear-data-btn" onClick={handleOnClear}>Clear Game Data</button>
          <button className="close-btn" onClick={onClose} >Close</button>
        </div>

      </div>
    </div>
  )
}

export default SettingsDialog

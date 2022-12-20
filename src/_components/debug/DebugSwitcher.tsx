import { FormControlLabel, Switch } from '@mui/material'
import { GlobalContext } from "_context/ContextGlobal";
import React from 'react'

export const DebugSwitcher = () => {
    const { isDebug, setIsDebug} = React.useContext(GlobalContext);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDebug(event.target.checked);
      };
    return (
        <FormControlLabel control={<Switch 
            //value={isDebug} 
            checked={isDebug} onChange={handleChange} />} label="debug" />
    )
}
import {useState,createContext} from 'react'

export const AppContext= createContext()

export const AppProvider= ({children})=>{
    const [theme,setTheme]= useState('light')
    const [court,setCourt]=useState('District Court')
    const [selectState, setSelectState] = useState(null);
    const [selectDistrict, setSelectDistrict] = useState(null);
    const [allDistricts, setAllDistricts] = useState([]); 
    return(
        <AppContext.Provider value={{theme,setTheme,court,setCourt,  selectState,
            setSelectState,
            selectDistrict,
            setSelectDistrict,
            allDistricts,
            setAllDistricts,}}>
            {children}
        </AppContext.Provider>
    )
}


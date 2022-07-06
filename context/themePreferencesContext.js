import { createContext, useState, useEffect } from "react";

const GlobalStateContext = createContext();

function GlobalStateProvider({ children }) {
  const [state, setState] = useState({
    color: 'pink',
    blogFilter: null,
    mode: 'auto',
    prefersDarkModeInOS: null
  })

  useEffect(() => {
    if (localStorage.getItem('theme-preferences')) {
      setState(JSON.parse(localStorage.getItem('theme-preferences')));
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      localStorage.setItem('theme-preferences', JSON.stringify({ ...state, 
        color: localStorage.getItem('theme-preferences') ? JSON.parse(localStorage.getItem('theme-preferences')).color : state.color,
        mode: localStorage.getItem('theme-preferences') ? JSON.parse(localStorage.getItem('theme-preferences')).mode : state.mode,
        prefersDarkModeInOS: event.matches 
      }))
      
      setState({...state, 
        color: localStorage.getItem('theme-preferences') ? JSON.parse(localStorage.getItem('theme-preferences')).color : state.color,
        mode: localStorage.getItem('theme-preferences') ? JSON.parse(localStorage.getItem('theme-preferences')).mode : state.mode,
        prefersDarkModeInOS: event.matches, 
      })
    });

    const userPrefersDarkModeInOS = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    setState({...state, 
      color: localStorage.getItem('theme-preferences') ? JSON.parse(localStorage.getItem('theme-preferences')).color : state.color,
      mode: localStorage.getItem('theme-preferences') ? JSON.parse(localStorage.getItem('theme-preferences')).mode : state.mode, 
      prefersDarkModeInOS: userPrefersDarkModeInOS, 
    })
  }, [typeof window !== "undefined"])


  const updateThemePreferences = (key, value) => {
    if (typeof window !== "undefined") {
      setState({...state, [key]: value})
      localStorage.setItem('theme-preferences', JSON.stringify({ ...state, [key]: value }))
    }
  }


  return (
    <GlobalStateContext.Provider value={{state, updateThemePreferences}}>
      { children }
    </GlobalStateContext.Provider>
  )
}

export { GlobalStateContext, GlobalStateProvider }
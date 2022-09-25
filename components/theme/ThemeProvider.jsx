/*
  Project Name: solid-sandbox
  License: MIT
  Created by: Lightnet
*/

import {
  createSignal
, createEffect
, createContext
} from 'solid-js';

//import "./theme.css"

export const ThemeContext = createContext([{ theme:'light'},{}]);

export function ThemeProvider(props){

  const [theme, setTheme] = createSignal('light');

  //createEffect(()=>{
    //console.log("THEME: ",theme())
  //})

  function checkThemeStroage(){
    if(!window.localStorage){
      return;
    }
    const storedTheme = window.localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    //console.log("storedTheme: ",storedTheme);
    if (storedTheme){
      document.documentElement.setAttribute('data-theme', storedTheme)
      setTheme(storedTheme);
    }
  }

  checkThemeStroage();

  const value = [
    theme, 
    {
      setSkin(color){
        setTheme(color)
      }
    }
  ]

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
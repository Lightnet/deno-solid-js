/*
  Project Name: solid-sandbox
  License: MIT
  Created by: Lightnet
*/

import {
  useContext
} from 'solid-js';

import { ThemeContext } from './ThemeProvider.jsx';
import { capFirstLetter } from '../../libs/helper.js';

export default function ToggleTheme(){

  const [theme,{setSkin}] = useContext(ThemeContext);

  function switchTheme(){
    //console.log("switchTheme")
    if(!window.localStorage){
      console.log("NOT FOUND!")
      return;
    }
    
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "light";
    if (currentTheme === "light") {
      targetTheme = "dark";
    }
    document.documentElement.setAttribute('data-theme', targetTheme);
    setSkin(targetTheme);
    localStorage.setItem('theme', targetTheme);
  }

  function toggleTheme(e){
    e.preventDefault();
    switchTheme();
  }

  return (
    <a href="#" class="btnLink" onClick={toggleTheme}>Theme {capFirstLetter(theme())}</a>
  )
}
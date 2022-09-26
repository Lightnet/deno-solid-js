/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { createMemo } from 'solid-js';

import { Link, useLocation, useNavigate } from 'https://cdn.skypack.dev/@solidjs/router';
//import { Link, useLocation } from '@solidjs/router';
//import ToggleTheme from './theme/ToggleTheme';

const IndexMenus = () => {
  
  const location = useLocation();
  //console.log(location)
  const pathname = createMemo(() => location.pathname);
  //const navigate = useNavigate();
  //for menu display
  const whitelist = [
    "/",
    "/about",
    "/account",
    "/signin",
    "/signup",
    "/signout",
    "/testlab",
    "/surrealdb",
    "/todolist",
  ];

  const displayMenu = createMemo(()=>{
    //console.log("FIND:",whitelist.find((item)=>{
      //return item === pathname()      
    //}))
    console.log(pathname())
    if(
      whitelist.find((item)=>{return item === pathname()})
      //true
    ){
      //console.log("FOUND")
      // <ToggleTheme /> //does not work here layer?
      return ( <div>
        <Link href="/">Home</Link><span> | </span>
        <Link href="/about">About</Link><span> | </span>
        <Link href="/account">Account</Link><span> | </span>
        <Link href="/testlab">Test Lab</Link><span> | </span>
        <Link href="/surrealdb">SurrealDB</Link><span> | </span>
        <Link  href="/todolist">To Do List</Link><span> | </span>
        </div>)
    }else{
      //console.log("NOT FOUND")
      return (<>
      </>)
    }
  })
  
  return (<>
  {displayMenu}
  </>)
}

export default IndexMenus;
/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { 
  createMemo
} from 'solid-js';

import { Link, useLocation, useNavigate } from 'https://cdn.skypack.dev/@solidjs/router';
//import { Link, useLocation } from '@solidjs/router';
//import ToggleTheme from './theme/ToggleTheme';

const IndexMenus = () => {
  
  const location = useLocation();
  //console.log(location)
  const pathname = createMemo(() => location.pathname);
  const navigate = useNavigate();
  //for menu display
  let whitelist = [
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

  function linkHome(e){
    e.preventDefault();
    navigate("/", { replace: true })
  }

  function linkAbout(e){
    e.preventDefault();
    navigate("/", { replace: true })
  }

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
        <a onClick={linkHome} href="/">Home</a><span> | </span>
        <a onClick={linkAbout} href="/about">About</a><span> | </span>
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
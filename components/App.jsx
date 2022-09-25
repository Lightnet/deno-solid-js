/*
  Project Name: deno-solid-js
  License: MIT
  Created By: Lightnet
*/

import { createSignal } from "solid-js"

export default function App(){
  
  const [count, setCount] = createSignal(0);

  function clickAdd(){
    setCount(count()+1);
  }

  function clickSubtract(){
    setCount(count()-1);
  }


  console.log("init client app...")
  return (<div>
    <label>Hello App!</label><br/>
    <button onClick={clickAdd}> Add </button>
    <button onClick={clickSubtract}> Subtract </button>
    <label> Count: {count()} </label>
  </div>)
}
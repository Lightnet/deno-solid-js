/*
  Project Name: solid-trois
  License: MIT
  Created by: Lightnet
*/

// https://www.solidjs.com/examples/context
// https://stackoverflow.com/questions/72368745/reseting-a-store-object-to-a-default-value-in-solidjs

import { useContext } from 'solid-js';

import { NotifyContext } from "./NotifyProvider.jsx";

export default function NotifyTest(props) {
  
  const [{notifies},{notify}] = useContext(NotifyContext);

  function btnInfo(){
    notify({
      color:"info",
      content:"Test Info"
    })
  }

  function btnSuccess(){
    notify({
      color:"success",
      content:"Test success"
    })
  }

  function btnError(){
    notify({
      color:"error",
      content:"Test error"
    })
  }

  function btnWarn(){
    notify({
      color:"warn",
      content:"Test warn"
    })
  }

  function btnWarn2(){
    notify({
      color:"warn",
      content:"Test warn asdasd asd asd as dasd as asd asd asd"
    })
  }

  return (
    <div>
      <button onClick={btnInfo}> Test Info</button>
      <button onClick={btnSuccess}> Test Success</button>
      <button onClick={btnError}> Test Error</button>
      <button onClick={btnWarn}> Test Warn</button>
      <button onClick={btnWarn2}> Test Warn 2</button>
    </div>
  );
}
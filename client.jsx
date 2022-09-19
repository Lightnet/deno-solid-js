/*
  Project Name: deno-solid-js
  License: MIT
  Created By: Lightnet
*/

// "surrealdb.js","https://unpkg.com/surrealdb.js@0.3.1/dist/web/index.js"

import { render } from 'solid-js/web';
//import * as Surreal from "surrealdb.js";
import App from "./App.jsx";
//console.log(App());

//console.log(Surreal)
//const db = new Surreal('http://127.0.0.1:8000/rpc');
/*
function HelloWorld() {
  return (
    <>
      <div>Hello World!</div>
    </>
  );
}

render(() => <HelloWorld />, document.getElementById('app'))
*/

//render(() => <App />, document.getElementById('app'))
render(App, document.getElementById('app'))

const loading = document.getElementById('loading')
document.body.removeChild(loading);


console.log("Hello World! Solidjs!");
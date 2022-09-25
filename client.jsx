/*
  Project Name: deno-solid-js
  License: MIT
  Created By: Lightnet
*/

// "surrealdb.js","https://unpkg.com/surrealdb.js@0.3.1/dist/web/index.js"

import { render } from 'solid-js/web';
import SurrealDB from "surrealdb.js";
import App from "./components/App.jsx";
//console.log(App());

console.log(SurrealDB)
const db = new SurrealDB('http://127.0.0.1:8000/rpc');
try{
  console.log(db)
  await db.use('test','test');
  await db.query(`SELECT * FROM user;`);
  let token;
  /*
  token = await db.signup({
    DB: 'test',
    NS: 'test',
    SC: 'allusers',
    email: 'test@test.test',
    pass: 'pass'
  });
  */
  
  token = await db.signin({
    DB: 'test',
    NS: 'test',
    SC: 'allusers',
    email: 'test@test.test',
    pass: 'pass'
  });
  

  console.log(token)
}catch(e){
  console.log(e)
}



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
/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests
import { Link } from '@solidjs/router'
//import { createEffect } from 'solid-js'
import { useAuth } from './AuthProvider.jsx';

export default function UserQuery() {

  const [,{token,clientDB}] = useAuth();

  const SurrealDB = clientDB()

  async function clickQuery(){
    await SurrealDB.use('test','test')
    let data = await SurrealDB.query('SELECT * FROM message;')
    console.log(data)
  }

  async function clickAuth(){
    let data = await SurrealDB.query('SELECT * FROM $auth;')
    console.log(data)
  }

  async function clickQuery2(){
    //console.log(btoa('root'+':'+'root'))
    console.log("ROOT ADMIN")
    let response = await fetch('http://localhost:8000/sql',{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "NS":"test",
        "DB":"test",
        "Authorization": 'Basic ' + btoa('root'+':'+'root'),
      },
      body:`SELECT * FROM user;`
    })
    console.log(response)
    let data = await response.json();
    console.log(data)
  }

  async function clickQuery3(){
    console.log(btoa('root'+':'+'root'))
    let response =  await fetch('http://localhost:8000/sql',{
      method:'POST',
      //mode: 'cors',
      //credentials: 'include',
      headers:{
        //'Origin':'http://localhost:3000',
        //'Access-Control-Allow-Origin':'http://localhost:3000',
        //'Accept':"text/plain",
        //"Content-Type":"text/html",
        //"Content-Type":"text/plain",
        //"Content-Type":"application/json",
        "NS":"test",
        "DB":"test",
        "SC":"allusers",
        "Authorization": 'Basic ' + btoa('test@test.test'+':'+'pass')
      },
      body:`SELECT * FROM user;`
    })
    console.log(response)
    let data = await response.json();
    console.log(data)
  }
  // https://javascript.info/fetch
  async function clickQuery4(){
    console.log("sign in")
    let response =  await fetch('http://localhost:8000/sigin',{
      method:'POST',
      //mode: 'cors',
      //mode: 'no-cors',
      //mode: 'websocket',
      //mode:'same-origin',
      //credentials: 'include',
      credentials: 'same-origin',
      //credentials: 'omit',
      headers:{
        //'Origin':'http://localhost:3000',
        //'Access-Control-Allow-Origin':'http://localhost:3000',
        'Accept':"text/plain",
        //"Content-Type":"text/html",
        "Content-Type":"text/plain",
        //"Content-Type":"application/json",
        //"NS":"test",
        //"DB":"test",
        //"SC":"allusers",
        //"Authorization": 'Basic ' + btoa('test@test.test'+':'+'pass')
      },
      body:JSON.stringify({
        NS:"test",
        DB:"test",
        SC:"allusers",
        email:"test@test.test",
        pass:"pass"
      })
    })
    console.log(response)
    let data = await response.text();
    console.log(data)
  }

  return (
    <div>
      <button onClick={clickAuth}>Query Auth</button>

      <button onClick={clickQuery}>Query 1</button>
      <button onClick={clickQuery2}>Query 2</button>
      <button onClick={clickQuery3}>Query 3</button>
      <button onClick={clickQuery4}>Sign in</button>
    </div>
  )
}
/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/68849233/convert-a-string-to-base64-in-javascript-btoa-and-atob-are-deprecated
// https://surrealdb.com/docs/start
// https://github.com/surrealdb/surrealdb.js/issues/11
// 
// 
//import * as Buffer from 'buffer-esm'
import { Link, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
//import { useAuth } from './AuthProvider'
import SurrealDB from 'surrealdb.js'
//import SurrealDB from 'https://unpkg.com/surrealdb@0.0.1-beta.3.5/lib/src/index.js'

console.log(SurrealDB)

export default function Login() {

  const [nameSpace, setNameSpace] = createSignal('test')
  const [dataBase, setDataBase] = createSignal('test')
  const [scope, seStcope] = createSignal('allusers')
  const [alias, setAlias] = createSignal('test')
  const [passphrase, setPassphrase] = createSignal('pass')
  const [email, setEmail] = createSignal('test@test.test')

  const db = new SurrealDB('http://localhost:8000/rpc');

  //console.log(Buffer)
  //const [,{setToken}] = useAuth();
  //console.log(Buffer)

  const navigate = useNavigate();

  function textToBase64(params){
    return btoa(params);//note it think of nodejs in vscode IDE, this is brower api
  }
/*
  const db = new SurrealDB('http://localhost:8000',{
        NS:"test",
        DB:"test",
        user: email(),
        pass: passphrase()
      })
*/
  const btnLogin = async (e)=>{
    console.log(alias())
    console.log(passphrase())
    try{
      //db.signIn()
      
      console.log(db)

      let token = await db.signin({
        DB: 'test',
        NS: 'test',
        SC: 'allusers',
        email: 'test@test.test',
        pass: 'pass'
      })

      console.log(token)
      //db.token(token)
      console.log(db)

      let result;

      //await db.use('test','test')

      //result = await db.create('message',{
        //content: "hello world!",
        //marketing: true,
			  //identifier: Math.random().toString(36).substr(2, 10),
      //});

      //console.log(result)

      //result = await db.query(`CREATE message SET content = "hello world!"`);
      //console.log(result)

      //result = await db.query('SELECT * FROM message;');
      //console.log(result)

      //result = await db.select("message");
      //console.log(result)

      /*
      let query = "CREATE user;"
      query="INFO FOR DB;"

      const response = await fetch('http://localhost:8000/sql',{
        method:'POST',
        headers:{
          "Authorization": 'Basic ' + textToBase64('root'+':'+'root') ,
          "NS": "test",
          "DB": "test",
          "Content-Type":"application/json"
        },
        body:query
      })

      console.log(response)
      let data = await response.json();
      console.log(data)
      */

      //const db = new SurrealDB('http://127.0.0.1:8000', {user: 'root',pass: 'root',database: 'test',namespace: 'test',});
      /*
      const db = new SurrealDB('http://127.0.0.1:8000', {
        database: 'test',
        namespace: 'test',
        //user: alias(),
        user: email(),
        pass: passphrase()
      });
      
      console.log(db)

      //let result = await db.Query('SELECT * FROM user;')
      let result = await db.Query('select *  from person;')
      console.log(result)
      */
     
    }catch(e){
      console.log(e)
    }
  }

  const btnSignUp = async (e)=>{
    //navigate("/signup", { replace: true })
    try{
      console.log("SIGN UP")
      let token = await db.signup({
        DB: 'test',
        NS: 'test',
        SC: 'allusers',
        email: 'test@test.test',
        pass: 'pass'
      })
      //db.signUp();
    }catch(e){
      console.log(e)
    }

  }

  async function clickQuery(){
    let result;

      await db.use('test','test')

      //result = await db.create('message',{
        //content: "hello world!",
        //marketing: true,
			  //identifier: Math.random().toString(36).substr(2, 10),
      //});

      //console.log(result)

      //result = await db.query(`CREATE message SET content = "hello world!"`);
      //console.log(result)

      result = await db.query('SELECT * FROM message;');
      console.log(result)

      //result = await db.select("message");
      //console.log(result)
  }

  async function  clickCreate(){
    await db.use('test','test')
    let result;
    result = await db.query(`CREATE message SET content = "hello world!"`);
    console.log(result)
  }

  return (
    <div>
      <label>SurrealQL tests</label><br/>
      
      <button onClick={btnSignUp}> Sign Up </button>
      <button onClick={btnLogin}> Login </button>
      <button onClick={clickQuery}> clickQuery </button>
      <button onClick={clickCreate}> clickCreate </button>
    </div>
  )
}
/*
<label> Name Space: </label><input value={nameSpace()} onInput={(e)=>setNameSpace(e.target.value)}/><br/>
      <label> Database: </label><input value={dataBase()} onInput={(e)=>setDataBase(e.target.value)}/><br/>
      <label> Scope: </label><input value={scope()} onInput={(e)=>seStcope(e.target.value)}/><br/>
      <label> Alias: </label><input value={alias()} onInput={(e)=>setAlias(e.target.value)}/><br/>
      <label> E-Mail: </label><input value={email()} onInput={(e)=>setEmail(e.target.value)}/><br/>
      <label> Passphrase: </label><input value={passphrase()} onInput={(e)=>setPassphrase(e.target.value)} /><br/>
*/
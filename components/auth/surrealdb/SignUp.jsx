/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Link, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import { useAuth } from './AuthProvider.jsx'

export default function SignUp() {

  const [alias, setAlias] = createSignal('test')
  const [passphrase, setPassphrase] = createSignal('pass')
  const [email, setEmail] = createSignal('test@test.test')
  const [status, setStatus] = createSignal('...')

  const [session,{clientDB}] = useAuth();
  const SurrealDB = clientDB();
  console.log(SurrealDB)

  const navigate = useNavigate();

  const btnCancel = (e)=>{
    navigate("/", { replace: true })
  }

  const btnSignUp = async (e)=>{
    console.log(alias())
    console.log(passphrase())
    try{
      let token = await SurrealDB.signup({
        DB: 'test',
        NS: 'test',
        SC: 'allusers',
        alias: alias(),
        email: email(),
        pass: passphrase()
      })
      console.log(token);
      setStatus("CREATED!")
    }catch(e){
      setStatus("Exist!")
      console.log(e);
    }    
  }

  return (
    <div>
      <label>Sign Up</label>  <br/>
      <label> Alias: </label><input value={alias()} onInput={(e)=>setAlias(e.target.value)}/><br/>
      <label> E-mail: </label><input value={email()} onInput={(e)=>setEmail(e.target.value)}/> <label> Status:{status()} </label><br/>
      <label> Passphrase: </label><input value={passphrase()} onInput={(e)=>setPassphrase(e.target.value)} /><br/>
      <button onClick={btnSignUp}> Sign Up </button>
      <button onClick={btnCancel}> Cancel </button>
    </div>
  )
}
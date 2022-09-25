/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Link, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import { useAuth } from './AuthProvider'

export default function SignIn() {

  const [alias, setAlias] = createSignal('test')
  const [passphrase, setPassphrase] = createSignal('pass')
  const [email, setEmail] = createSignal('test@test.test')
  const [status, setStatus] = createSignal('...')

  const [,{setToken,clientDB}] = useAuth();
  const SurrealDB = clientDB();

  const navigate = useNavigate();

  const btnLogin = async (e)=>{
    console.log(alias())
    console.log(passphrase())
    try{
      let token = await SurrealDB.signin({
        DB: 'test',
        NS: 'test',
        SC: 'allusers',
        email: email(),
        pass: passphrase()
      })
      console.log(token);
      setToken(token)
      setStatus("PASS!")
      navigate("/", { replace: true })
    }catch(e){
      console.log(e)
      setStatus("FAIL!")
    }
  }

  const btnSignUp = (e)=>{
    e.preventDefault();
    navigate("/signup", { replace: true })
  }

  return (
    <div>
      <label>Sign In</label><br/>
      <label> Alias: </label><input value={alias()} onInput={(e)=>setAlias(e.target.value)}/><br/>
      <label> E-Mail: </label><input value={email()} onInput={(e)=>setEmail(e.target.value)}/><label> Status:{status()} </label><br/>
      <label> Passphrase: </label><input value={passphrase()} onInput={(e)=>setPassphrase(e.target.value)} /><br/>
      <a href='#' onClick={btnSignUp}> Sign Up </a>
      
      <button onClick={btnLogin}> Login </button>
    </div>
  )
}
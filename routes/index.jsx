/*
  Project Name: deno-solid-js
  License: MIT
  Created By: Lightnet
*/

//import {h} from "solid-js"

//for server
//export function handle(req){
  //return new Response("Hello, World!",{status:200,headers:{'Content-Type':'text/html'}});
//}
import TestSQL from "../components/auth/surrealdb/TestSQL.jsx"

function PageIndex() {
  console.log("index!")
  return (<div>
    <label> App Page Test!</label>
    <TestSQL/>
  </div>)
}
//
export default PageIndex;
/*
  Project Name: deno-solid-js
  License: MIT
  Created By: Lightnet
*/

//import * as path from "https://deno.land/std/path/mod.ts";
import * as fs from "$std/fs/mod.ts";
import { serve } from "$std/http/server.ts";
//import { crypto } from "$std/crypto/mod.ts";
import { config } from "dotenv";
//import * as babelCore from "https://esm.sh/@babel/core";
// babel-standalone
import Babel from "@babel/standalone";
import solid from "babel-preset-solid";
Babel.registerPreset("solid", solid());
import chalk from "chalk";
import { setupDataBase } from "./libs/clientSurrealDB.js";

const log = console.log;
//console.log(chalk.blue('Hello world!'));
console.log(chalk.green('Hello world!'));
//log(chalk.blue.bgRed.bold('Hello world!'));

//console.log(crypto.randomUUID())
//console.log(document.toString())
//const __filename = new URL(import.meta.url).pathname;
//const __dirname = path.dirname(__filename);
//console.log(__filename)
//console.log(__dirname)

//console.log(config());
const { 
  PORT
//, SECRET
//, ENVIRONMENT 
}= config();

//console.log("PORT: ", PORT)
//console.log("SECRET: ", SECRET)
//console.log("ENVIRONMENT: ", ENVIRONMENT)

const routePages = new Map();

routePages.set('/about',{
  name:"about"
})

routePages.set('/account',{
  name:"account"
})

routePages.set('/testlab',{
  name:"testlab"
})

routePages.set('/surrealdb',{
  name:"surrealdb"
})

const port = Number(PORT) || 3000;

//BROWSER CLIENT REQUEST HANDLER
// fetch function has build in function for deno
async function apiFetch(req) {
  const pathname = new URL(req.url).pathname;
  //console.log("pathname",pathname);

  if(pathname=='favicon.ico'){
    return new Response("",{status:404});  
  }

  //default page
  //need to set up two type checks.
  if(pathname=='/'){
    let textHtml = await Deno.readTextFile("./index.html");
    textHtml=textHtml.replace('<!--CLIENT-->','<script type="module" src="client.jsx" nonce="n0nce"></script>')
    return new Response(textHtml,{status:200,headers:{'Content-Type':'text/html'}});
    //return new Response(document.toString(),{status:200,headers:{'Content-Type':'text/html'}});
  }

  if(pathname.endsWith('.js')){
    try{
      const fileNameUrl = new URL("."+pathname, import.meta.url);
      const fileText = await Deno.readTextFile(fileNameUrl);
      return new Response(fileText,{headers:{'Content-Type':'text/javascript'} });
    }catch(e){
      return new Response("Uh oh!!\n"+e.toString(), { status: 500 });
    }
  }

  if(pathname.endsWith('.css')){
    try{
      const fileNameUrl = new URL("."+pathname, import.meta.url);
      const fileText = await Deno.readTextFile(fileNameUrl);
      console.log(fileText)
      return new Response(fileText,{headers:{'Content-Type':'text/css'} });
    }catch(e){
      return new Response("Uh oh!!\n"+e.toString(), { status: 500 });
    }
  }

  //filename.jsx
  if(pathname.endsWith('.jsx')){
    //console.log("FOUND", pathname)
    let textHtml = "";
    try{
      //const fileName = new URL("."+pathname, import.meta.url)
      //console.log("fileName: ", fileName.toString())
      //let textJSX = await Deno.readTextFile(fileName);
      const CWDFilePath = "."+pathname;
      //console.log("JSX-to-JS Path: ",CWDFilePath)
      const textJSX = await Deno.readTextFile(CWDFilePath);
      //console.log(textJSX);
      //textJSX = textJSX.replace('/** @jsxRuntime classic */','')
      //textJSX = textJSX.replace('/** @jsx h */','/** @jsxImportSource https://esm.sh/preact */')
      //console.log(babelCore)
      //textHtml=Babel.transform(textJSX, {presets: ["solid"], babelrc: false}).code
      textHtml=Babel.transform(textJSX, {presets: ["solid"]}).code
    }catch(e){
      console.log("ERROR?")
      console.log(e)
      return new Response("Uh oh!!\n"+e.toString(), { status: 500 });
    }
    return new Response(textHtml,{ status:200, headers:{'Content-Type':'text/javascript'} });
    //return new Response("Hello, World!",{headers:{'Content-Type':'text/javascript'} });
  }

  if(routePages.has(pathname)==true){//map array if set string matches
    let textHtml = await Deno.readTextFile("./index.html");
    textHtml=textHtml.replace('<!--CLIENT-->','<script type="module" src="client.jsx" nonce="n0nce"></script>')
    return new Response(textHtml,{status:200,headers:{'Content-Type':'text/html'}});
  }
  
  //if the url page is not found return simple text
  //return new Response("Hello, World!",{status:200,headers:{'Content-Type':'text/html'}});
  //if the url page is not found return index page
  const response = new Response(undefined,{
    status:302,
    headers:{'location':"/"}
  });
  return response;
}

// this handle loading and unloading event serve
const handler = (e) => {
  //console.log(`got ${e.type} event in event handler (main)`);
};

globalThis.addEventListener("load", handler);

globalThis.addEventListener("beforeunload", handler);

globalThis.addEventListener("unload", handler);

globalThis.onload = async (e) => {
  //console.log(`got ${e.type} event in onload function (main)`);
  await setupDataBase();
  //basic set up server or serve http
  serve(apiFetch,{port:port});
  console.log(`http://localhost:${port} `+new Date().toUTCString())
};

globalThis.onbeforeunload = (e) => {
  //console.log(`got ${e.type} event in onbeforeunload function (main)`);
};

globalThis.onunload = (e) => {
  //console.log(`got ${e.type} event in onunload function (main)`);
};

console.log("log from main script: "+new Date().toUTCString());
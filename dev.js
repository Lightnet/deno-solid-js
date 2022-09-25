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
//import transformReactJsx from "https://esm.sh/@babel/plugin-transform-react-jsx";
import chalk from "chalk";

import Surreal from "surrealdb.js";
const db = new Surreal('http://127.0.0.1:8000/rpc');

/*
try {
  // Signin as a namespace, database, or root user
  await db.signin({
    user: 'root',
    pass: 'root',
  });

  // Select a specific namespace / database
  await db.use('test', 'test');
  let data = await db.query(`SELECT * FROM user;`);
  console.log(data)
} catch (e) {
  console.error('ERROR', e);
}

*/

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

const port = Number(PORT) || 3000
//console.log(port)
// API and ROUTES
//console.log("Deno.cwd()", Deno.cwd())
//console.log("INIT SET UP FILES...")

// AWAIT IMPORT
async function loadImportModule(fileName){
  try{
    //console.log(fileName)
		const m = await import(fileName).then(module => {
      //return {default:module.default,handler:module.handler }
      //console.log(module)
      return module
		});
		//console.log("m fun:",fileName)
		//console.log(m.constructor.name) // check for AsyncFunction and Function tags  
		//console.log(m)
		return m;
	}catch(e){
		console.log("ERROR HANDLE LOADING...")
		console.log(e)
		return null;
	}
}

const apiUrls = new Map();
// Async
async function apiFilesNames() {
  for await (const entry of fs.walk(Deno.cwd()+"/routes/api")) {
    if(entry.path.endsWith('.js')){
      //console.log(entry.path);
      const pageName = "/api/"+entry.name.split(".")[0];
      const pageModule = await loadImportModule("./routes/api/"+entry.name)
      apiUrls.set(pageName,{
        fileName:entry.name,
        handler: pageModule.default || null
      })
    }
  }
}
await apiFilesNames().then(() => console.log("API Files Done!"));

const routeUrls = new Map();
// Async
async function routeFilesNames() {
  for await (const entry of fs.walk(Deno.cwd()+"/routes/")) {
    if(entry.path.endsWith('.jsx')){
      //console.log(entry)
      //console.log(entry.path);
      const pageName = "/"+entry.name.split(".")[0];
      //console.log("pageName:", pageName)
      //if(pageName=="/index"){//default url
        //const pageModule = await loadImportModule("file://"+entry.path)
        const pageModule = await loadImportModule("./routes/"+entry.name)
        routeUrls.set(pageName,{
          page:pageModule.default || null,
          fileName:entry.name,
          handler: pageModule.handle || null
        })
      //}else{
        //routeUrls.set(pageName,{
          //page:null,
          //handler:null
        //})
      //}
    }
  }
}
await routeFilesNames().then(() => console.log("Routes Files Done!"));

function clientRouteToString(fileName,props){
  if(!props){
    props={};
  }
return `<script type="module" nonce="n0nce">
  import { render } from 'solid-js/web';
  import App from "./routes/${fileName}"
  let props = JSON.parse('${JSON.stringify(props)}')
  if(props){
    render(App, document.getElementById('app'))
  }else{
    render(App, document.getElementById('app'))
  }
  let loading = document.getElementById("loading")
  if(loading){
    loading.remove()
  }
</script>`;
}

//BROWSER CLIENT REQUEST HANDLER
// fetch function has build in function for deno
async function apiFetch(req) {
  const pathname = new URL(req.url).pathname;
  //console.log("pathname",pathname);

  if(pathname=='favicon.ico'){
    return new Response("",{status:404});  
  }

  //CHECK PATH API files
  //this will filter out for return data else it return error
	if(pathname.search("/api/")==0){
    //console.log("FOUND API:", pathname)
    //need to change the way handle url in case of params and [name].js
    if(apiUrls.has(pathname)==true){//match file name
      const APIModule = apiUrls.get(pathname);//get the api module
      //console.log(APIModule)
			try{
				if(APIModule.handler){//check if this is not null
					if(APIModule.handler.constructor.name=='Function'){//check if not sync for function
            //console.log("Function")
						return APIModule.handler(req)
					}else if (APIModule.handler.constructor.name=='AsyncFunction'){//check if sync for AsyncFunction
            //console.log("AsyncFunction")
						return await APIModule.handler(req);
					}else{//if not those functions return error
						return new Response("Uh oh!!\n", { status: 500 });	
					}
				}else{
					return new Response("Uh oh!!\n", { status: 500 });
				}
			}catch(e){
				return new Response("Uh oh!!\n"+e.toString(), { status: 500 });
			}
    }else{//check if there no api url matches and return error
      return new Response("Uh oh!!\n", { status: 500 });
    }
  }

  //need more detail which is parms matches or [name].jsx
  //
  if(routeUrls.has(pathname)==true){
    //page module
    const pageModule = routeUrls.get(pathname)
    //console.log(pageModule)
    try{
      let pageProps={};
      if(pageModule.handler){//check if this is not null
        console.log("ROUTES HANDLER")
        if(pageModule.handler.constructor.name=='Function'){//check if not sync for function
          
          const data = pageModule.handler(req);
          console.log(data instanceof Response)
          console.log(data)
          if(data instanceof Response){
            return data
          }else{
            pageProps = data;
          }
        }else if (pageModule.handler.constructor.name=='AsyncFunction'){//check if sync for AsyncFunction
          //return await pageModule.handler(req);
          const data = await pageModule.handler(req);
          if(data instanceof Response){
            return data
          }else{
            pageProps = data;
          }
        }
      }
      //check page doc for render
      //console.log(typeof pageModule.page)
      if(pageModule.page){//check if this is not null
        if(pageModule.page.constructor.name==='Function'){
          //return pageModule.page(req);
          console.log(pageModule.fileName)

          let textHtml = await Deno.readTextFile("./index.html");
          textHtml=textHtml.replace('<!--CLIENT-->', clientRouteToString(pageModule.fileName,pageProps) )
          return new Response(textHtml,{status:200,headers:{'Content-Type':'text/html'}});
        }else if(pageModule.page.constructor.name==='AsyncFunction'){

          let textHtml = await Deno.readTextFile("./index.html");
          textHtml=textHtml.replace('<!--CLIENT-->', clientRouteToString(pageModule.fileName,pageProps) )
          return new Response(textHtml,{status:200,headers:{'Content-Type':'text/html'}});
        }else{
          return new Response("Uh oh!!\n"+e.toString(), { status: 500 });    
        }
      }
    }catch(e){
      return new Response("Uh oh!!\n"+e.toString(), { status: 500 });
    }
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
      return new Response(fileText,{headers:{'Content-Type':'text/css'} });
    }catch(e){
      return new Response("Uh oh!!\n"+e.toString(), { status: 500 });
    }
  }

  //filename.jsx
  if(pathname.endsWith('.jsx')){
    console.log("FOUND", pathname)
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
      textHtml=Babel.transform(textJSX, {presets: ["solid"]}).code
    }catch(e){
      console.log("ERROR?")
      console.log(e)
      return new Response("Uh oh!!\n"+e.toString(), { status: 500 });
    }
    return new Response(textHtml,{ status:200, headers:{'Content-Type':'text/javascript'} });
    //return new Response("Hello, World!",{headers:{'Content-Type':'text/javascript'} });
  }
  //if the url page is not found return simple text
  //return new Response("Hello, World!",{status:200,headers:{'Content-Type':'text/html'}});
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
  //await initDB();
  //testTables();
  //basic set up server or serve http
  serve(apiFetch,{port:port});
};

globalThis.onbeforeunload = (e) => {
  //console.log(`got ${e.type} event in onbeforeunload function (main)`);
};

globalThis.onunload = (e) => {
  //console.log(`got ${e.type} event in onunload function (main)`);
};

/*
async function serveHttp(conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    // The native HTTP server uses the web standard `Request` and `Response`
    // objects.
    const body = `Your user-agent is:\n\n${
      requestEvent.request.headers.get("user-agent") ?? "Unknown"
    }`;
    
    // The requestEvent's `.respondWith()` method is how we send the response
    // back to the client.
    requestEvent.respondWith(
      new Response(body, {
        status: 200,
      }),
    );
  }
}

// Start listening on port 8080 of localhost.
const server = Deno.listen({ port: 3000 });

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // without awaiting the function
  serveHttp(conn);
}
*/

console.log("log from main script");
/*
  Project Name: deno-solid-js
  License: MIT
  Created By: Lightnet
*/

export default function handle(req){
  const headers = new Headers();
	headers.set('Content-Type','text/html; charset=UTF-8')
  //headers.set('Set-Cookie', cookie.serialize('test','testss'))
  //return new Response(blob,{headers:heads});
  //return new Response('Hello Echo!',{headers:headers});
  return new Response('Hello Echo!',{headers});
}
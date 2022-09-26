
import Surreal from "surrealdb.js";
import { encode, decode } from "https://deno.land/std/encoding/base64.ts"

function textToBase64(params){
	return encode(params);//note it think of nodejs in vscode IDE, this is brower api
}

async function fetchQuerySQL(query){
	const resp = await fetch('http://localhost:8000/sql',{
		method:'POST',
		headers:{
			"Authorization": 'Basic ' + textToBase64('root'+':'+'root') ,
			"NS": "test",
			"DB": "test",
			"Content-Type":"application/json"
		},
		body:query
	})
	const data = await resp.json();
	return data;
}

async function setupDataBase(){
  try {
    const db = new Surreal('http://127.0.0.1:8000/rpc');
    // Signin as a namespace, database, or root user
    await db.signin({
      user: 'root',
      pass: 'root',
    });
  
    // Select a specific namespace / database
    await db.use('test', 'test');
    let data;
    //data = await db.query(`SELECT * FROM user;`);
    //console.log(data)

    data = await db.query(`INFO FOR DB;`);
    console.log(data)

    data = await fetchQuerySQL(`
    DEFINE TABLE user SCHEMALESS
      PERMISSIONS
        FOR select, update WHERE user = $auth.id,
        FOR create, delete NONE;`);
    console.log(data)


    data = await fetchQuerySQL(`DEFINE SCOPE allusers
      SESSION 14d
      SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass), alias = $alias, role = "allusers" )
      SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) );`);
    console.log(data)

    data = await fetchQuerySQL(`DEFINE TABLE message SCHEMALESS;`);
    console.log(data)


  } catch (e) {
    console.error('ERROR', e);
  }
}

export {
  setupDataBase
}

import Surreal from "surrealdb.js";

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

    data = await db.query(`DEFINE TABLE message SCHEMALESS;`);
    console.log(data)


  } catch (e) {
    console.error('ERROR', e);
  }
}

export {
  setupDataBase
}
//postgresql://DB%21_owner:npg_9IOVlL3gudEp@ep-lively-fog-a5an2244-pooler.us-east-2.aws.neon.tech/DB%21?sslmode=requireimport { Client } from 'pg'
const { Client } = require("pg");


const client = new Client({
    connectionString: "postgresql://nenodb_owner:npg_okZjRnq9Cvu0@ep-sparkling-shape-a5qieorr-pooler.us-east-2.aws.neon.tech/nenodb?sslmode=require"
  })
  
  

  async function createUsersTable() {
    await client.connect();
    
    try{
        const result = await client.query(`
            SELECT COUNT(*) FROM users56; 

        `)
        //const query = "SELECT * FROM users56 WHERE emsail = $1;";
        //const values = [email];
        console.log(result)
    }catch(err){
        console.log(err);
    }
    finally {
        await client.end();
    }
}

createUsersTable();


const mysql = require('mysql')


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'waboke13579',
  database: 'blog_nodjs1'
})

db.connect((err)=>{
  if(!err){
    console.log("Connected to Database");
    db.query('SELECT 1 from blog', (err, results) => {
      if (err) {
        console.log("creating table");
        db.query (`CREATE TABLE blog (
          id INT NOT NULL AUTO_INCREMENT,
          title VARCHAR(60) NOT NULL,
          img_url TEXT NOT NULL,
          description VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
     
      )`);
      console.log("Table Created");
      }else{
         console.log("Table alrady exist")
      }
     
    });
  }else{
    console.log("failed to connect");
  }
})

module.exports = db
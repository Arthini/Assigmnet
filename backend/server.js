const express = require('express');

const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"students"
})
// MongoDB connection
// const mongoURI = 'your-mongodb-connection-string';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// Define a schema and model for the tables
// const tableSchema = new mongoose.Schema({
//   tableName: String,
//   columns: [
//     {
//       name: String,
//       type: String
//     }
//   ]
// });

// const Table = mongoose.model('Table', tableSchema);

// Routes
// app.get('/api/tables', async (req, res) => {
//   try {
//     const tables = await Table.find();
//     res.json(tables);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.post('/api/tables', async (req, res) => {
//   const table = new Table({
//     tableName: req.body.tableName,
//     columns: req.body.columns
//   });

app.post('login',(req,res)=>{
  const sql="SELECT * FROM login WHERE username=? AND password =?"
  const values=[
    req.body.email,
    req.body.password
  ]
  db.query(sql,[values],(err,data)=>{
    if(err) return res.json("Login Failed");
    return res.json(data);
  })
})

//   try {
//     const newTable = await table.save();
//     res.status(201).json(newTable);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.put('/api/tables/:id', async (req, res) => {
//   try {
//     const table = await Table.findById(req.params.id);
//     if (table == null) {
//       return res.status(404).json({ message: 'Cannot find table' });
//     }

//     table.tableName = req.body.tableName;
//     table.columns = req.body.columns;
//     const updatedTable = await table.save();
//     res.json(updatedTable);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.delete('/api/tables/:id', async (req, res) => {
//   try {
//     const table = await Table.findById(req.params.id);
//     if (table == null) {
//       return res.status(404).json({ message: 'Cannot find table' });
//     }

//     await table.remove();
//     res.json({ message: 'Deleted Table' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

 app.listen(port, () => {
 console.log(`Server running on port ${port}`);
 });

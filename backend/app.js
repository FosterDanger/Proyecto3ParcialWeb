const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const postRoutes = require("./routes/posts");

const app = express();
const cors  = require('cors');


mongoose.connect("mongodb+srv://Foster:13Division@cluster0.63awxk3.mongodb.net/Encuesta?retryWrites=true&w=majority")
.then(()=>{
  console.log('Base de datos conectada');
})
.catch(()=>{
  console.log('Conexion Fallida: (');
})

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

/* app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Request, Content-Type, Accept");
  res.setHeader("Allow","GET, POST, PATCH,PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
}); */

app.use("/api.posts", postRoutes);


module.exports = app;

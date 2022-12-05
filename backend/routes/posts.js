const express = require("express");
const Post = require('../models/post');
const PostLogin = require('../models/postLogin');

const router = express.Router();
const jwt = require('jsonwebtoken');
const { async } = require("rxjs");


router.post("/Register", async (req, res, next)=>{
  const { usuario,email,contraseña } = req.body;
  const post = new PostLogin({
    usuario: req.body.usuario,
    email: req.body.email,
    contraseña: req.body.contraseña
  });
  const user = await PostLogin.findOne({usuario});
  if(user) return res.status(401).send("El usuario ya existe");
  post.save().then(createdPost => {
    //console.log(result);
    const token = jwt.sign({postId: createdPost._id}, 'secretkey');
    res.status(201).json({
      message: 'PostLogin added succesfull',
      postId: createdPost._id,
      token
    });
  });
});

router.post("/Login", async (req, res, next) => {
  const { usuario,contraseña } = req.body;
  const user = await PostLogin.findOne({usuario});
  if(!user) return res.status(401).send("El usuario no existe");
  if(user.contraseña !== contraseña) return res.status(401).send("Contraseña incorrecta");

  const token = jwt.sign({_id: user._id }, 'secretkey');
  res.status(200).json({token});

})

router.put("/Login2/:id", (req, res, next) => {
  const Post = new PostLogin({
    _id: req.body.id,
    usuario: req.body.usuario,
    email: req.body.email,
    contraseña: req.body.contraseña
  });
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    //console.log(result);
    res.status(200).json({message: "PostLogin update Succesfully"});
  })
});

 router.get("/LoginRes", (req, res, next)=>{
  PostLogin.find().then(documents => {
    res.status(200).json({
      message: 'Publicaciones Login expuestas con Exito',
      datos: documents
    });
  })
});

router.get("/Login2/:id", (req,res,next) =>{
  PostLogin.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message: 'PostLogin no encontrado'});
    }
  });
});

router.post("",(req, res, next)=>{
  const post = new Post({
    nombre: req.body.nombre,
    estado: req.body.estado,
    ciudad: req.body.ciudad,
    sucursal: req.body.sucursal,
    servicio: req.body.servicio,
    calificacionServicio: req.body.calificacionServicio,
    recomendacion: req.body.recomendacion
  });
  post.save().then(createdPost => {
    //console.log(result);
    res.status(201).json({
      message: 'Post added succesfull',
      postId: createdPost._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    nombre: req.body.nombre,
    estado: req.body.estado,
    ciudad: req.body.ciudad,
    sucursal: req.body.sucursal,
    servicio: req.body.servicio,
    calificacionServicio: req.body.calificacionServicio,
    recomendacion: req.body.recomendacion
  });
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    //console.log(result);
    res.status(200).json({message: "Post update Succesfully"});
  })
});

 router.get("", verifyToken, (req, res, next)=>{
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Publicaciones expuestas con Exito',
      datos: documents
    });
  })
});

router.get("/:id", (req,res,next) =>{
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message: 'Post no encontrado'});
    }
  });
});

/* app.delete('/api.posts.eliminar/:id', (req, res) =>{
  Post.deleteOne({id: req.params.id}).then(result =>{
    console.log(result)
    res.status(200).json({
      //console.log(resultado)
      result
    });
  });
}) */

router.delete("/:id",(req, res, next)=>
{
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:'Publicacion Eliminada!'})
  });
});


module.exports = router;

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
      console.log("No es posible entrar");
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

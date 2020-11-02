const express = require('express');
const router = express.Router();
const House = require('../model/house'); //obtiene el esquema de los datos


//Mostramos la interfaz por pantalla
router.get('/', async (req, res) => {
  const houses = await House.find();//Mostramos los Registros
  res.render('index', { //Objeto de javascript
    houses //arreglo a recorrer y mostar
  });
});

//Obtiene los datos del formulario
router.post('/add', async (req, res, next) => { //Operacion Asincrona
  const house = new House(req.body); //Creo objetos que se almacenan en mongo
  await house.save();//guardamos en la base de datos
  res.redirect('/');//redirige a la interfaz principal
});

router.get('/turn/:id', async (req, res, next) => { //Operacion de estado
  let { id } = req.params;
  const house = await House.findById(id);
  house.status = !house.status; //Editamos la propiedad estatus
  await house.save(); //Guardamos ese dato dentro de la bse de datos
  res.redirect('/');
});


router.get('/edit/:id', async (req, res, next) => {
  const house = await House.findById(req.params.id); //Obtenemos id
  console.log(house)
  res.render('edit', { house }); //Renderizamos a otra vista
});

router.post('/edit/:id', async (req, res, next) => { //Obtenemos datos ya editados
  const { id } = req.params;
  await House.update({_id: id}, req.body); //actualizamos la base de datos
  res.redirect('/');
});

router.get('/delete/:id', async (req, res, next) => { //Ruta de peticion para borrar
  let { id } = req.params;
  await House.remove({_id: id}); //Metodo para eliminar
  res.redirect('/');
  
});


module.exports = router;

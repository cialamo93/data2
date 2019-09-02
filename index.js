const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

app.listen(3000, () => console.log('escuchando al 3000 po chorizo'));
app.use(express.static('public'));
app.use(express.json());

const database = new Datastore('database.db');
database.loadDatabase();
//database.insert({nombre: 'Alamo, Carlos Alamo', status: 'Lo Máximo', Cristobal: 'Muy Gay', lohRumoreh: 'Ciertos'});

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get('/weather/:latlon', async (request, response) => {

  const latlon = request.params.latlon.split(','); //Con esto obtenemos lat. y long. y los dividimos para separarlos.
  console.log(request.params); //Esto es para ver si funciona.
  console.log(latlon); //Esto es para ver si funciona.
  const lat = latlon[0]; //Específicamos la latitud
  const lon = latlon[1]; //Específicamos la longitud
  console.log(lat, lon); //Esto es para ver si funciona.

 //Estos 3 son para pedir el tiempo a la API.
 const api_key = process.env.API_KEY;
 const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}/?units=si`; //Al final están los parametros específicados.
 const weather_response = await fetch(weather_url);
 const weather_data = await weather_response.json();

  //Estos 3 son para pedir la Calidad del Aire (aq = air quality) a la API.
  const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`; //Al final están los parametros específicados.
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();

  const data = {
    weather: weather_data,
    air_quality: aq_data
  }


  response.json(data);
});


//Set-Location -Path "C:\Users\calam\Desktop\Porquerias_Ignacio\programacion2\3.5"
//cd C:/Users/calam/Desktop/Porquerias_Ignacio/programacion2/3.5

//Lo de arriba es para poner la carpeta en el powershell


// OJO QUE ESTE EJERCICIO SOLO FUNCIONA CON CIERTAS CIUDADES (ESO SE CAMBIA EN LA CONSOLA DEL NAVEGADOR). SI NO CAMBIAS LA CIUDAD
// Y SIGUES EN SANTIAGO VA A TIRAR ERROR. SAN FRANCISCO DEBERIA FUNCIONAR.
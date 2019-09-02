//Tiene que estar todo dentro de la función ya que esta es la que detecta la posición del navegador.
navigator.geolocation.getCurrentPosition(pos => {

    const lat = pos.coords.latitude; //Nuestra latitud (o la latitud que indica el navegador, ya que podemos elegir la que queramos)
    const lon = pos.coords.longitude; //Nuestra longitud (o la latitud que indica el navegador, ya que podemos elegir la que queramos)

    const mymap = L.map('mapid').setView([lat, lon], 1); //Esto es donde se ubica la "vista" del mapa.

    let marker = L.marker([lat, lon]).addTo(mymap); //Esto es el marcador que ubica nuestra posición
    
    //Esto son los ajustes del mapa en si.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    
// TODO ESTO QUE HAY ABAJO ES DE LOGS.JS Y LO TUVIMOS QUE PONER ACÁ PORQUE NECESITAMOS SACAR LAS LON. Y LAT. DE DATABASE.DB PARA MAPEAR DONDE
// ESTUVIMOS, Y EL CODIGO DE ABAJO HACE ESO (EN LOGS.JS EL CODIGO REGISTRABA NUESTRAS LOCATIONS EN TEXTO, Y ACA LAS MAPEAMOS)
getData();

async function getData() {
const response = await fetch('/api'); //puede ser '/api' igual que index.html porque este es un GET mientras que en el otro era un post. Igual en el peor de los casos le cambias el nombre.
const data = await response.json();

for (item of data) {
  let marker = L.marker([item.lat, item.lon]).addTo(mymap); //Esto es el marcador que ubica nuestra posición

  const pop_txt = `El tiempo en las coordenadas ${item.lat} y ${item.lon} es de ${item.weather.temperature} grados celsius y
  el material particulado es de un nivel PM25 de ${item.air.value}`;

  marker.bindPopup(pop_txt);
}

//console.log(data);
};

});

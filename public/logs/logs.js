
getData();

async function getData() {
const response = await fetch('/api'); //puede ser '/api' igual que index.html porque este es un GET mientras que en el otro era un post. Igual en el peor de los casos le cambias el nombre.
const data = await response.json();

for (item of data) {

  let marker = L.marker([item.lat, item.lon]).addTo(mymap); //Esto es el marcador que ubica nuestra posición

  const root = document.createElement('div');
  const mood = document.createElement('div');
  const geo = document.createElement('div');
  const date = document.createElement('div');
  

  mood.textContent = `mood. ${item.weather}`;
  geo.textContent = `${item.lat}°, ${item.lon}°`; 
  const dateString = new Date(item.timestamp).toLocaleString();
  date.textContent = dateString;
  
  
  root.append(mood, geo, date);
  document.body.append(root);

}

console.log(data);
};

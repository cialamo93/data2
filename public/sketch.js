if ("geolocation" in navigator) {
    console.log('geolocalizacion disponible');
    navigator.geolocation.getCurrentPosition(async pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        document.getElementById('lat').textContent = lat.toFixed(2);
        document.getElementById('lon').textContent =lon.toFixed(2);
        
        const api_url = `/weather/${lat},${lon}`;
        const response = await fetch(api_url);
        const json = await response.json();
        //console.log(json);

        const weather = json.weather.currently;
        const air = json.air_quality.results[0].measurements[1];
        
        document.getElementById('summary').textContent = weather.summary;//Datos del tiempo en json al HTML
        document.getElementById('temperature').textContent = json.weather.currently.temperature;//Datos del tiempo en json al HTML
        document.getElementById('city').textContent = json.air_quality.results[0].location;//Datos del aire en json al HTML
        document.getElementById('pm25').textContent = air.value;//Datos del aire en json al HTML
        
        
        const data = {
            lat,
            lon,
            weather,
            air
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const db_response = await fetch('/api', options);
        const db_json = await db_response.json();
        console.log(db_json);

        //ESTA ES LA ULTIMA PARTE AGREGADA PARA QUE APAREZCA EN EL LOG DE LA PAG. PRINCIPAL EL REGISTRO DE UBICACIONES.
        getData();

        async function getData() {
                const response = await fetch('/api'); //puede ser '/api' igual que index.html porque este es un GET mientras que en el otro era un post. Igual en el peor de los casos le cambias el nombre.
                const data = await response.json();
   
                console.log(data);
            }});
       
} else {
    console.log('geolocalizacion NOOOOO disponible')
};


    

    //ESTA TODO HECHO HASTA EL MINUTO 9:00. EL WN QUERÍA MAPEAR EL HISTORIAL DE UBICACIONES EN EL MAPA PERO EN LA PAGINA DE LOGS,
    //PERO YO LO HICE EN LA PAGINA PRINCIPAL PARA NO TENER QUE HACER TODO DE NUEVO, YA QUE EL PROCESO ES TECNICAMENTE EL MISMO.
    //OTRA COSA QUE EL WN HIZO FUE HACER MAS ERROR HANDLING AL FINAL PARA LAS CIUDADES QUE NO APARECIAN CON INFO DEL AIRE, PERO NO LO HICE.

    



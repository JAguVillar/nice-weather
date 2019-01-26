$(window).on("load", function () {
  let longitud;
  let latitud;
  var localStr;

  // SearchBox.addListener('places_changed', function() {
  //     var locale = searchBox.getPlaces()[0];
  //     console.log(place.geomtry.location.lat());

  // });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(extraer);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  function extraer(position) {
    console.log("longitud: " + position.coords.longitude);
    console.log("latitud: " + position.coords.latitude);
    
    longitud = position.coords.longitude;
    latitud = position.coords.latitude;
    //console.log(longitud, latitud);
    let proxy = `https://cors-anywhere.herokuapp.com/`;
    let apiURL = `${proxy}https://api.darksky.net/forecast/9155007309d8bd89b080c1921f5d1ac1/${latitud}, ${longitud}?lang=es&units=si`;
    console.log(apiURL);

    $.getJSON(apiURL, function (data) {
      actualizar(data);
    });
  }

  // // // // //FUNCA MEJOR, ver como usar
  // let geoip = `https://geoip-db.com/json/`;

  // $.getJSON(geoip, function(data) {
  //   console.log(data);
  // });

  function actualizar(data) {
    var fecha = new Date();
    var diaNumero = fecha.getDate();
    var diaSemana = fecha.getDay();
    var fechaUnix = new Date(data.currently.time * 1000);
    var hora = fechaUnix.getHours();
    var minutos = "0" + fechaUnix.getMinutes();
    var segundos = "0" + fechaUnix.getSeconds();
    console.log(hora + ":" + minutos.substr(-2) + ":" + segundos.substr(-2));

    var array = [];
    var arreglo = [1, 2, 5, 1, 2, 4]
    var p = 0;

    while (p <= 48) {
      var fechaUnixArr = new Date(data.hourly.data[p].time);
      var horaArr = fechaUnixArr.getHours();
      var minutosArr = "0" + fechaUnixArr.getMinutes();
      var segundosArr = "0" + fechaUnixArr.getSeconds();
      var horaform = horaArr + ":" + minutosArr.substr(-2) + ":" + segundosArr.substr(-2);
      array.push(horaform);
      p++;
    }

    console.log(array);

    var dia = new Array();
    dia[0] = "Domingo";
    dia[1] = "Lunes";
    dia[2] = "Martes";
    dia[3] = "Miercoles";
    dia[4] = "Jueves";
    dia[5] = "Viernes";
    dia[6] = "Sabado";

    // var mes = new Array();
    //     mes[0]="Enero";
    //     mes[1]="Febrero";
    //     mes[2]="Marzo";
    //     mes[3]="Abril";
    //     mes[4]="Mayo";
    //     mes[5]="Junio";
    //     mes[6]="Julio";
    //     mes[7]="Agosto";
    //     mes[8]="Septiembre";
    //     mes[9]="Octubre";
    //     mes[10]="Noviembre";
    //     mes[11]="Diciembre";

    //Localidad
    localStr = data.timezone.toString();
    localStr = localStr.replace(/\//g, ", ");
    
    $("#localizacion").html(localStr);
    $("#fecha").append(
      `<p>` + dia[diaSemana] + ` ` + diaNumero + `</p>`
    );
    //Grados
    $("#grados-temperatura").html(Math.round(data.currently.temperature) + ` °C`);
    //Descripcion Clima
    $("#gridIcono").append(
      `<h5 id="descripcionClima">` + data.currently.summary + `</h5>`
    );
    //Icono
    var nombreArchivo = data.currently.icon;
    $("#iconoMain").html(`<img id="iconoMain" src="iconos/` + nombreArchivo + `256.png"/>`);  
    //Info Adicional
    var info = `<div id="container-info"><p>`;
    info +=
      `<i class="fas fa-tint"></i> Humedad: ` +
      Math.round(data.currently.humidity * 100) +
      `%</p>`;
    info +=
      `<i class="fas fa-umbrella"></i> Porbabilidad de Precipitacion: ` +
      Math.round(data.currently.precipProbability * 100) +
      `%</p>`;
    info +=
      `<i class="fas fa-wind"></i> Viento: ` +
      data.currently.windSpeed +
      ` km/h.</p></div>`;
    $("#gridInfo").html(info);
  }
});

$(document).ready(function() {
  let longitud;
  let latitud;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(extraer);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  function extraer(position) {
    longitud = position.coords.longitude;
    latitud = position.coords.latitude;
    //console.log(longitud, latitud);
    let proxy = `https://cors-anywhere.herokuapp.com/`;
    let apiURL = `${proxy}https://api.darksky.net/forecast/9155007309d8bd89b080c1921f5d1ac1/${latitud}, ${longitud}?lang=es&units=si`;

    $.getJSON(apiURL, function(data) {
      console.log(data);
      actualizarPost(data);
    });
  }

  function actualizarPost(data) {
    var c = 1;
    do {
      var post = `<div class="pronosticos">`;
      var fechaUnix = data.daily.data[c].time; // UNIX timestamp in seconds
      var diaNumero = new Date();
      diaNumero.setTime(fechaUnix * 1000); // javascript timestamps are in milliseconds
      diaNumero.toUTCString();

      var fechaUnix = new Date(data.daily.data[c].time * 1000);
      var hora = fechaUnix.getHours();
      var minutos = "0" + fechaUnix.getMinutes();
      var segundos = "0" + fechaUnix.getSeconds();
      var horaPronostico = hora + ":" + minutos.substr(-2);

      var dia = new Array();
      dia[0] = "Domingo";
      dia[1] = "Lunes";
      dia[2] = "Martes";
      dia[3] = "Miercoles";
      dia[4] = "Jueves";
      dia[5] = "Viernes";
      dia[6] = "Sabado";

      var nombreArchivo = data.daily.data[c].icon;

      post +=
        `<div class="row pronosticosDia" id="pronosticosDia` +
        c +
        `" onclick="funcion(` +
        c +
        `)">`;
      post +=
        `<div class="col-sm-3 col-md-6" id="gridDatosPost">` +
        `<div id="container-DatosPost">`;
      if (c == 1) {
        post += `<p>Mañana</p>`;
      } else {
        post += `<p>` + dia[diaNumero.getDay()] + `</p>`;
      }
      post += `<p>` + data.daily.data[c].summary + `</p>` + `</div>` + `</div>`;

      if (nombreArchivo == "rain") {
        post +=
          `<div class="col-md-3" id="iconoPost"><div id="iconoPost"><img id="icono" src="iconos/` +
          nombreArchivo +
          `.png"/><p>` +
          `<i class="fas fa-umbrella"></i> ` +
          Math.round(data.daily.data[c].precipProbability * 100) +
          `%</p></div></div>`;
      } else {
        post +=
          `<div class="col-md-3" id="iconoPost"><div id="iconoPost"><img id="icono" src="iconos/` +
          nombreArchivo +
          `.png"/></div></div>`;
      }
      post +=
        `<div class="col-md-3" id="gridGradosPost">` +
        `<div id="container-gradosPost">` +
        `<div id="temperaturaMax">` +
        `<i class="fas fa-caret-up"></i> ` +
        Math.round(data.daily.data[c].temperatureHigh) +
        ` °C` +
        `</div>` +
        `<hr/>` +
        `<div id="temperaturaMin">` +
        `<i class="fas fa-caret-down" style="  color: #8e8e8e"></i> ` +
        Math.round(data.daily.data[c].temperatureLow) +
        ` °C` +
        `</div>` +
        `</div>` +
        `</div>`;
      post += `</div>`;
      post += `</div> <br>`;

      pronosticos(post, c);

      c++;
      } while (c <= 7);
  }
});

function pronosticos(post, c) {
  setTimeout(function() {
    $("#climaPost").append(post);
  }, 200*c);
  console.log("dia" + c);
}

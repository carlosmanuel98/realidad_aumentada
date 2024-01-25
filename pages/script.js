// Variables para almacenar la carga de objetos de los marcadores:
var drill = false;
var tripod = false;

// RECONOCIMIENTO DE LA PÁGINA QUE SE CARGA A TRAVÉS DE UN SMARTPHONE
function detectar_mobile() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    // RECONOCIMIENTO DE LA PÁGINA QUE SE CARGA A TRAVÉS DE UNA COMPUTADORA
    return false;
  }
}

// Variables para el control del final de la aplicación:
var final = false;

if (detectar_mobile() == true) {
  // Mensaje inicial para SMARTPHONE
  alert("Por favor, gire su celular.");
}

// MODELOS QUE COMIENZAN OCULTOS:
// Mensaje de error:
var erro = document.getElementById("ModelErro");
erro.setAttribute("visible", false);
// Mensaje de éxito:
var correct = document.getElementById("ModelCorrect");
correct.setAttribute("visible", false);
// Mensaje de continuidad:
var ok = document.getElementById("ModelOK");
ok.setAttribute("visible", false);

var pagina = document.getElementById("corpo"); // diseño de la página completa

// Modelo de la taladradora
var modelDrill = document.getElementById("drillModel");
// Modelo del trípode
var modelTripod = document.getElementById("tripodModel");
// Modelo de la chapa metálica
var metalPlate = document.getElementById("MetalPlate");

// Mostrar u ocultar chapa metálica:
function hideMetalPlate() {
  metalPlate.setAttribute("visible", false);
}
function showMetalPlate() {
  metalPlate.setAttribute("visible", true);
}

// Mostrar u ocultar error:
function hideError() {
  erro.setAttribute("visible", false);
}
function showError() {
  erro.setAttribute("visible", true);
}

// Mostrar u ocultar acierto:
function hideOk() {
  ok.setAttribute("visible", false);
}
function showOk() {
  ok.setAttribute("visible", true);
}

// Mostrar éxito:
function showCorrect() {
  correct.setAttribute("visible", true);
}

// RECONOCIMIENTO DEL MARCADOR EN LA CÁMARA:
// Cargar Taladradora
var markerDrill = document.getElementById("markerDrill");
markerDrill.addEventListener("markerFound", function () {
  if (final != true) {
    setTimeout(function () {
      modelDrill.setAttribute("visible", true);
    }, 0);
    modelDrill.setAttribute("animation", "property: position; to: 0 0 0; dur: 0");
    drill = true;
    if (tripod == false) {
      setTimeout(hideMetalPlate, 2000); // ocultar chapa metálica después de 2 segundos
      modelDrill.setAttribute("animation", "property: position; to: -10 0 0; dur: 8000"); // Simular taladradora en la chapa metálica
      setTimeout(function () {
        modelDrill.setAttribute("visible", false);
      }, 1950); // ocultar taladradora del marcador después de 2 segundos

      setTimeout(showError, 2000); // mostrar error después de 2 segundos
      setTimeout(function () {
        alert("Retire el marcador..");
      }, 2000);
    }
  }
});
// Perder Taladradora
var markerDrill = document.getElementById("markerDrill");
markerDrill.addEventListener("markerLost", function () {
  if (final != true) {
    drill = false;
    setTimeout(hideError, 4000); // ocultar error después de 1 segundo
    setTimeout(showMetalPlate, 4000); // mostrar chapa metálica después de 1 segundo
  }
});

// Cargar Trípode
var markerTripod = document.getElementById("markerTripod");

markerTripod.addEventListener("markerFound", function () {
  if (final != true) {
    modelTripod.setAttribute("animation", "property: position; to: -8 15 0; dur: 7000");
    tripod = true;
    setTimeout(hideMetalPlate, 2000); // ocultar chapa metálica después de 2 segundos
    setTimeout(function () {
      modelTripod.setAttribute("visible", false);
    }, 1950); // ocultar trípode del marcador después de 2 segundos
    setTimeout(showOk, 2000); // mostrar error después de 2 segundos
    setTimeout(function () {
      alert("Ingrese marcador");
    }, 2000);

    setTimeout(function () {
      modelTripod.setAttribute("visible", true);
    }, 5000);
    //setTimeout(showOk, 8000);
  }

  markerDrill.addEventListener("markerFound", function () {
    tripod = true;
    setTimeout(function () {
      modelDrill.setAttribute("visible", false);
    }, 0);
    setTimeout(function () {
      modelTripod.setAttribute("visible", false);
    }, 0);
    modelDrill.setAttribute("animation", "property: position; to: -10 0 0; dur: 8000"); // Simular taladradora en la chapa metálica
    setTimeout(hideOk(), 2000);
    setTimeout(showCorrect, 500); // mostrar acierto después de 1 segundos
    setTimeout(function () {
      alert("¡Completado!!\n\n");
    }, 5000);
    setTimeout(function () {
      window.location.href = "/index.html";
    }, 5001);
  });
  final = true;
});

// Perder Trípode
var markerTripod = document.getElementById("markerTripod");
markerTripod.addEventListener("markerLost", function () {
  tripod = false;
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

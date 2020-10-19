import axios from "axios";
import bootstrap from "bootstrap";
import "./styles/main.scss";

(function () {
  var marca;
  var modelo;
  var presupuesto;
  var transmision;
  var row = document.getElementById("quiz-container");

  var autosFiltrados = [];

  function init(lista) {
    var indexId = 1;
    lista.forEach((e) => {
      //Creación de arreglo de respuestas
      let options = [];
      const incorrectas = e.incorrect_answers;
      for (let i = 0; i < incorrectas.length; i++) {
        options.push(incorrectas[i]);
      }
      options.push(e.correct_answer);
      options.sort();
      console.log(e.correct_answer);
      console.log(e.question);
      var col = document.createElement("form");
      col.setAttribute("class", "col-12");
      row.appendChild(col);
      var question = document.createElement("p");
      col.setAttribute("id", indexId);
      indexId += 1;
      question.innerHTML = e.question;
      col.appendChild(question);
      //Creación de botones radio
      for (let i = 0; i < options.length; i++) {
        var answer = document.createElement("input");
        answer.setAttribute("type", "radio");
        answer.setAttribute("id", "option" + i);
        answer.setAttribute("name", "options");
        answer.setAttribute("value", options[i]);
        answer.innerHTML = options[i];
        col.appendChild(answer);
        var radioLabel = document.createElement("label");
        radioLabel.setAttribute("for", options[i]);
        radioLabel.innerHTML = options[i];
        col.appendChild(radioLabel);
        var jump = document.createElement("br");
        col.appendChild(jump);
      }

      //Fin de creación de botones radio
    });
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-12");
    row.appendChild(col2);
    var submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit");
    submitButton.innerHTML = "Submit";
    col2.appendChild(submitButton);
    //Botón de submit
    const btn2 = document.querySelector("#submit");
    // handle click button
    btn2.onclick = function () {
      let puntos = 0;
      console.log("hola desde submit");
      for (let i = 0; i < lista.length; i++) {
        console.log(i);
        let pregunta = document.getElementById(`${i + 1}`);
        console.log(pregunta);
        console.log(pregunta.options.value);
        /* pregunta = document.querySelector('input[name="options"]:checked').value; */
        console.log(lista[i].correct_answer);
        if (pregunta.options.value == lista[i].correct_answer) {
          console.log("entró");
          puntos += 100;
        }
      }
      alert("Puntos: " + puntos);
    };
  }

  /* function mostrarAutos(lista) {
    for (var i = 0; i < lista.length; i++) {
      //Creación de div contenedor de tarjeta
      var col = document.createElement("div");
      col.setAttribute("class", "col-md-4 mt-5");
      row.appendChild(col);
      //Creación de tarjeta con clases de bootstrap
      var card = document.createElement("div");
      card.setAttribute("class", "card auto-cards");
      col.appendChild(card);
      //Creación de imagen para tarjeta de bootstrap
      var bCardImg = document.createElement("img");
      bCardImg.setAttribute("class", "card-img-top");
      if (lista[i].make == "Chevrolet") {
        bCardImg.setAttribute("src", logo[0].Chevrolet);
      } else if (lista[i].make == "Ford") {
        bCardImg.setAttribute("src", logo[0].Ford);
      } else {
        bCardImg.setAttribute("src", logo[0].Nissan);
      }
      card.appendChild(bCardImg);
      //Creación de Cuerpo de tarjeta
      var cuerpo = document.createElement("div");
      cuerpo.setAttribute("class", "card-body");
      card.appendChild(cuerpo);
      //Creación de Párrafo para Nombre
      var nombre = document.createElement("p");
      nombre.setAttribute("class", "card-text");
      nombre.setAttribute("style", "font-weight: bold");
      nombre.innerHTML = lista[i].model;
      cuerpo.appendChild(nombre);
      //Creación de Párrafo para Marca
      var marca = document.createElement("p");
      marca.setAttribute("class", "card-text");
      marca.innerHTML = lista[i].make;
      cuerpo.appendChild(marca);
      //Creación de Párrafo para Modelo
      var modelo = document.createElement("p");
      modelo.setAttribute("class", "card-text");
      modelo.setAttribute("class", "type-font");
      modelo.innerHTML = "Modelo:" + lista[i].year;
      cuerpo.appendChild(modelo);
      //Creación de Párrafo para Colores
      var colores = document.createElement("p");
      colores.setAttribute("class", "card-text");
      colores.innerHTML = "Colores: " + lista[i].colors;
      cuerpo.appendChild(colores);
      //Creación de Párrafo para Precio
      var precio = document.createElement("p");
      precio.setAttribute("class", "card-text");
      precio.innerHTML = "Precio: $" + lista[i].price;
      cuerpo.appendChild(precio);
    }
  } */

  const btn = document.querySelector("#quiz");
  // handle click button
  btn.onclick = function () {
    console.log("hola");
    row.innerHTML = "";
    let category = document.getElementById("category");
    let difficulty = document.getElementById("difficulty");
    let type = document.getElementById("type");
    console.log(category.value);
    console.log(difficulty.value);
    console.log(type.value);
    if (
      category.value == "any" &&
      difficulty.value == "any" &&
      type.value == "any"
    ) {
      var url = "https://opentdb.com/api.php?amount=10";
    } else if (category.value == "any" && difficulty.value == "any") {
      var url = `https://opentdb.com/api.php?amount=10&type=${type.value}`;
    } else if (difficulty.value == "any" && type.value == "any") {
      var url = `https://opentdb.com/api.php?amount=10&category=${category.value}`;
    } else if (category.value == "any" && type.value == "any") {
      var url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty.value}`;
    } else if (category.value == "any") {
      var url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty.value}&type=${type.value}`;
    } else if (difficulty.value == "any") {
      var url = `https://opentdb.com/api.php?amount=10&category=${category.value}&type=${type.value}`;
    } else if (type.value == "any") {
      var url = `https://opentdb.com/api.php?amount=10&category=${category.value}&difficulty=${difficulty.value}`;
    } else {
      var url = `https://opentdb.com/api.php?amount=10&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`;
    }
    axios
      .get(url)
      .then((response) => {
        if (response.data.response_code == "1") {
          alert(
            "No tenemos suficientes preguntas para esta combinación de opciones, por favor intenta con otros parámetros"
          );
        } else {
          //Aquí se obtienen las preguntas
          let preguntas = response.data.results; //data es donde viene la información que se busca
          init(preguntas);
        }
      })
      .catch((error) => {
        console.log(error);
        //aquí se pasa un error si ocurre al tratar de traer los paises
      });

    /* row.innerHTML = "";
      autosFiltrados = [];
      marca = document.querySelector('input[name="marca"]:checked').value;
      //console.log(marca);
      modelo = document.querySelector('input[name="modelo"]:checked').value;
      //console.log(modelo);
      presupuesto = document.getElementById("presupuesto").value;
      //console.log(presupuesto);
      if (presupuesto < 15000 || presupuesto > 150000) {
        alert(
          "Por favor introduce un presupuesto de entre $15,000.00 y $150,000.00"
        );
      } else {
        transmision = document.querySelector('input[name="transmision"]:checked')
          .value;
        console.log(transmision);
        //Inicio de proceso de validación
        for (var i = 0; i < auto.length; i++) {
          if (
            auto[i].make == marca &&
            auto[i].year == modelo &&
            auto[i].transmision == transmision &&
            presupuesto >= auto[i].price * 0.2
          ) {
            autosFiltrados.push(auto[i]);
          }
          //console.log(autosFiltrados.length);
        }
      } */
  };
})();

//Respaldos del index

for (let i = 0; i < 10; i++) {
  transmision = document.querySelector('input[name="options"]:checked').value;
  console.log(transmision);
}

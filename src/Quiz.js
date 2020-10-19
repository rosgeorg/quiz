class Quiz {
  constructor(preguntas) {
    this.preguntas = preguntas;
    this.options = [];
    this.puntos = 0;
  }

  generateOptionsArray(preguntas) {
    this.options = [];
    const incorrectas = preguntas.incorrect_answers;
    for (let i = 0; i < incorrectas.length; i++) {
      this.options.push(incorrectas[i]);
    }
    this.options.push(preguntas.correct_answer);
    this.options.sort();
    /* console.log(preguntas.correct_answer);
    console.log(preguntas.question); */

    return this.options;
  }

  registrarRespuestas(lista) {
    const btn2 = document.querySelector("#submit");
    btn2.onclick = function () {
      this.puntos = 0;
      /* console.log("hola desde submit"); */
      for (let i = 0; i < lista.length; i++) {
        let pregunta = document.getElementById(`${i + 1}`);
        console.log(pregunta.options.value);
        console.log(lista[i].correct_answer);
        if (pregunta.options.value == lista[i].correct_answer) {
          /* console.log("entró"); */
          this.puntos += 100;
        }
      }
      alert("Puntos: " + this.puntos);
    };
    return this.puntos;
  }

  init(lista) {
    let indexId = 1;
    var row = document.getElementById("quiz-container");
    lista.forEach((e) => {
      //Creación de arreglo de respuestas
      this.generateOptionsArray(e);
      //Creación del form
      var col = document.createElement("form");
      col.setAttribute("class", "col-12");
      col.setAttribute("class", "mt-3");
      row.appendChild(col);
      var question = document.createElement("p");
      col.setAttribute("id", indexId);
      question.innerHTML = indexId + ") " + e.question;
      indexId += 1;
      col.appendChild(question);
      //Creación de botones radio
      for (let i = 0; i < this.options.length; i++) {
        var answer = document.createElement("input");
        answer.setAttribute("type", "radio");
        answer.setAttribute("id", "option" + i);
        answer.setAttribute("name", "options");
        answer.setAttribute("value", this.options[i]);
        answer.innerHTML = this.options[i];
        col.appendChild(answer);
        var radioLabel = document.createElement("label");
        radioLabel.setAttribute("for", this.options[i]);
        radioLabel.innerHTML = this.options[i];
        col.appendChild(radioLabel);
        var jump = document.createElement("br");
        col.appendChild(jump);
      }

      //Fin de creación de botones radio
    });
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-12");
    col2.setAttribute("class", "col-12 d-flex justify-content-center");
    row.appendChild(col2);
    var submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit");
    submitButton.setAttribute("class", "btn btn-dark btn-style");
    submitButton.innerHTML = "SUBMIT";
    col2.appendChild(submitButton);
    //Fin de creación de form
    //Botón de submit

    this.registrarRespuestas(lista);
  }
}

export default Quiz;

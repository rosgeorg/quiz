import axios from "axios";
import Uri from "./Uri";
import Quiz from "./Quiz";
import bootstrap from "bootstrap";
import "./styles/main.scss";

(function () {
  const btn = document.querySelector("#quiz");
  btn.onclick = function () {
    const uriCreator = new Uri();
    const url = uriCreator.urlCreator;
    axios
      .get(url)
      .then((response) => {
        if (response.data.response_code == "1") {
          alert(
            "No tenemos suficientes preguntas para esta combinación de opciones, por favor intenta con otros parámetros"
          );
        } else {
          let preguntas = response.data.results; //data es donde viene la información que se busca (las preguntas con sus respuestas)
          const quiz = new Quiz(preguntas);
          quiz.init(preguntas);
        }
      })
      .catch((error) => {
        console.log(error); //aquí se pasa un error si ocurre al tratar de traer las preguntas
      });
  };
})();

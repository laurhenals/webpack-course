// import Template from './templates/Template.js';
// //Añadir los estilos css.
// import './styles/main.css';
// //Añadir el estilo de stylus
// import './styles/vars.styl';
//Cuando necesito importar un archivo que está en otro lugar, para eso se usan alias.
import Template from "@templates/Template";
//Añadir los estilos css.
import "@styles/main.css";
//Añadir el estilo de stylus
import "@styles/vars.styl";

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();

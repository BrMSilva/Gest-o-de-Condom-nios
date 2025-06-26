import { createRoot } from "react-dom/client"; // Importando createRoot corretamente
import App from "./App";
import React from "react"; // Importando React para JSX

const container = document.getElementById("root"); // Obtendo o elemento root
if (container) {
  const root = createRoot(container); // Criando um root para renderização
  root.render(<App />); // Renderizando o componente App
} else {
  console.error("Elemento 'root' não encontrado no documento.");
}




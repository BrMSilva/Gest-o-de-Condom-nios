import React from "react";
import { createRoot } from "react-dom/client"; // Importando createRoot corretamente
import App from "./App";

const container = document.getElementById("root"); // Obtendo o elemento root
const root = createRoot(container); // Criando um root para renderização
root.render(<App />); // Renderizando o componente App




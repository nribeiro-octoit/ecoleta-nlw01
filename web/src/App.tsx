import React from 'react';
import './App.css';
import Routes from './routes';

function App() {
  return (
    <Routes></Routes>
  );
}

export default App;


// function App() {
//   const [counter, setCounter] = useState(0); // [valor do estado, função para atualizar o valor do estado]

//   function handleButtonClick() {
//     setCounter(counter + 1);
//   }

//   return (
//     <div>
//       <Header title={`Contador: ${counter}`}></Header>
//       <h1>{counter}</h1>
//       <button type="button" onClick={handleButtonClick}>Aumentar</button>
//     </div>
//   );
// }
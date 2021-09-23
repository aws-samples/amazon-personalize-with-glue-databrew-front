import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './context/Auth.context.jsx';


function AppWithProvider() {
  return (
    <ContextProvider value={500}>
    <App />
    </ContextProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<AppWithProvider />, rootElement)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

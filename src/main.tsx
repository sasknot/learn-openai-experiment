import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
// import openAI from './openai'
import './reset.css'
import './main.css'

// console.log(await openAI.listModels())

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

import './app.css'
import { FormEvent, useState } from 'react'
// import openAI from './openai'
// console.log(await openAI.listModels())

export default function () {
  const [input, setInput] = useState('')
  const result = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, temporibus? Nulla officia, quo consectetur blanditiis nihil deleniti earum numquam repudiandae laudantium esse ipsam ut, veritatis, optio fugiat ducimus itaque debitis!'

  function handlerSubmit (event: FormEvent) {
    event.preventDefault()
    console.log('input', input)
  }

  return (
    <>
      <header>
        <div className="container">
          <h1>OpenAI experiment</h1>
        </div>
      </header>
      <main className="container">
        <form onSubmit={handlerSubmit}>
          <label htmlFor="input">Input</label>
          <input id="input" onChange={({ target }) => setInput(target.value)} />
        </form>
        {result && (
          <div>
            <h2>Result:</h2>
            <p>{result}</p>
          </div>
        )}
      </main>
      <footer>
        <div className="container">
          <a href="http://github.com/sasknot">@sasknot</a>
        </div>
      </footer>
    </>
  )
}

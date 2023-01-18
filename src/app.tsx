import type { OpenAIFile } from 'openai'
import type { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import openAI from '@/openai'
import { FileForm, FileList } from '@/files'
import { FineTuneList } from '@/fine-tunes'
import './app.css'

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;

  input {
    display: block;
    width: 100%;
    border-radius: 10px;

    padding: 10px 20px;
    font-size: 2rem;
  }
`

const StyledResult = styled.div`
  h2 {
    font-size: 1.5rem;
  }
`

const StyledHR = styled.hr`
  width: 100%;
`

export default function () {
  const [input, setInput] = useState('')
  const result = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, temporibus? Nulla officia, quo consectetur blanditiis nihil deleniti earum numquam repudiandae laudantium esse ipsam ut, veritatis, optio fugiat ducimus itaque debitis!'
  const [fileListItems, setFileListItems] = useState<OpenAIFile[]>([])

  async function fetchFileListItems () {
    const { data } = await openAI.listFiles()
    setFileListItems(data.data)
  }
  function handlerSubmit (event: FormEvent) {
    event.preventDefault()
    console.log('input', input)
  }
  async function handleFileListItemsFineTune (id: string) {
    await openAI.createFineTune({
      training_file: id,
      model: 'davinci',
      suffix: 'aircrafts'
    })
  }
  async function handleFileListItemsDestroy (id: string) {
    await openAI.deleteFile(id)
    setFileListItems([
      ...fileListItems.filter((item) => item.id === id)
    ])
  }

  useEffect(() => {
    fetchFileListItems().catch(console.error)
  }, [])

  return (
    <>
      <header>
        <div className="container">
          <h1>OpenAI experiment</h1>
        </div>
      </header>
      <main className="container">
        <StyledForm onSubmit={handlerSubmit}>
          <label htmlFor="input">Input</label>
          <input id="input" onChange={({ target }) => setInput(target.value)} />
        </StyledForm>
        {result && (
          <StyledResult>
            <h2>Result:</h2>
            <p>{result}</p>
          </StyledResult>
        )}

        <StyledHR />
        <FileForm onUploadFullfilled={() => fetchFileListItems()} />

        <StyledHR />
        <FileList
          items={fileListItems}
          onFineTune={handleFileListItemsFineTune}
          onDestroy={handleFileListItemsDestroy}
        />

        <StyledHR />
        <FineTuneList />
      </main>
      <footer>
        <div className="container">
          <a href="http://github.com/sasknot">@sasknot</a>
        </div>
      </footer>
    </>
  )
}

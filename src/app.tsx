import type { Model, OpenAIFile } from 'openai'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import openAI from '@/openai'
import { SearchForm, SearchResult } from '@/search'
import { FileForm, FileList } from '@/files'
import { FineTuneList } from '@/fine-tunes'
import './app.css'

const StyledHR = styled.hr`
  width: 100%;
`

export default function () {
  const [modelListItems, setModelListItems] = useState<Model[]>([])
  const [searchResult, setSearchResult] = useState('')
  const [fileListItems, setFileListItems] = useState<OpenAIFile[]>([])

  async function fetchModels () {
    const { data } = await openAI.listModels()
    setModelListItems(data.data)
  }
  async function fetchFileListItems () {
    const { data } = await openAI.listFiles()
    setFileListItems(data.data)
  }
  async function handleSearchSubmit (model: string, prompt: string) {
    const { data } = await openAI.createCompletion({
      model,
      prompt,
      max_tokens: 1024,
      temperature: 0
    })
    console.log('data', data)
    setSearchResult(data.choices.map(({ text }) => text).join('\n'))
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
    Promise.all([
      fetchModels(),
      fetchFileListItems()
    ]).catch(console.error)
  }, [])

  return (
    <>
      <header>
        <div className="container">
          <h1>OpenAI experiment</h1>
        </div>
      </header>
      <main className="container">
        <SearchForm models={modelListItems} onSubmit={handleSearchSubmit} />

        {searchResult && (
          <>
            <StyledHR />
            <SearchResult text={searchResult} />
          </>
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

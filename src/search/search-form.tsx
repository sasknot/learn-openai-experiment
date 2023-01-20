import type { Model } from 'openai'
import type { FormEvent } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

type SearchFormProps = {
  loading?: boolean
  models: Model[]
  onSubmit?: (model: string, input: string) => void
}

const StyledSection = styled.section`
  form {
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    align-items: start;

    select {
      font-size: 1rem;
      padding: 5px;
    }

    input {
      display: block;
      width: 100%;
      border-radius: 10px;

      padding: 10px 20px;
      font-size: 2rem;
    }

    button {
      font-size: 1.25rem;
      padding: 5px 10px;
    }
  }
`

export default function ({
  loading = false,
  models = [],
  onSubmit
}: SearchFormProps) {
  const [selectedModel, setSelectedModel] = useState('')
  const [input, setInput] = useState('')

  function handleSubmit (event: FormEvent) {
    event.preventDefault()

    if (!loading) {
      onSubmit && onSubmit(selectedModel, input)
    }
  }

  return (
    <StyledSection>
      <h2>Search input</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Model:
          <select
            disabled={loading}
            onChange={({ target }) => setSelectedModel(target.value)}
          >
            {models.map((model, index) => (
              <option key={index}>{model.id}</option>
            ))}
          </select>
        </div>
        <input
          disabled={loading}
          onChange={({ target }) => setInput(target.value)}
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </StyledSection>
  )
}

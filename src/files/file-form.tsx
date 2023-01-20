import type { FormEvent } from 'react'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import openAI from '@/openai'

type FileFormProps = {
  onUploadFullfilled?: () => void
}

const StyledForm = styled.form`
  max-width: 600px;
  margin: 0 auto;

  button {
    padding: 5px 10px;
    font-size: 1.25rem;
  }
`

export default function ({ onUploadFullfilled }: FileFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit (event: FormEvent) {
    event.preventDefault()

    if (inputRef.current && inputRef.current.files && inputRef.current.files[0]) {
      setLoading(true)
      await openAI.createFile(inputRef.current.files[0], 'fine-tune')
      inputRef.current.value = ''

      onUploadFullfilled && onUploadFullfilled()
      setLoading(false)
    }
  }

  return (
    <section>
      <h2>File Upload</h2>
      <StyledForm onSubmit={handleSubmit}>
        <input ref={inputRef} type="file" disabled={loading} />
        <button type="submit" disabled={loading}>Send file</button>
      </StyledForm>
    </section>
  )
}

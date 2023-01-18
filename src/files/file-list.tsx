import type { OpenAIFile } from 'openai'
import dayjs from 'dayjs'
import styled from 'styled-components'

type FileListProps = {
  items: OpenAIFile[]
  onFineTune?: (id: string) => void
  onDestroy?: (id: string) => void
}

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  thead {
    background-color: #444;
  }

  thead tr th,
  tbody tr td {
    padding: 5px 10px;
    text-align: left;
  }

`

export default function ({ items, onFineTune, onDestroy }: FileListProps) {
  return (
    <section>
      <h2>File List</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>Id</th>
            <th>Filename</th>
            <th>Created at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.filename}</td>
              <td>{dayjs.unix(row.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>
                <button
                  type="button"
                  onClick={() => onFineTune && onFineTune(row.id)}
                >
                  Fine tune
                </button>
                {' '}
                <button
                  type="button"
                  onClick={() => onDestroy && onDestroy(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </section>
  )
}

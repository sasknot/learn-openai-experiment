import type { FineTune, FineTuneEvent } from 'openai'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import openAI from '@/openai'

const StyledSection = styled.section`
  table {
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
  }
`

export default function () {
  const [items, setItems] = useState<FineTune[]>([])
  const [openId, setOpenId] = useState('')
  const [events, setEvents] = useState<FineTuneEvent[]>([])

  async function fetchItems () {
    const { data } = await openAI.listFineTunes()
    setItems(data.data)
  }
  async function handleSeeEvents (id: string) {
    const { data } = await openAI.listFineTuneEvents(id)
    setOpenId(id)
    setEvents(data.data)
  }
  function handleHideEvents () {
      setOpenId('')
      setEvents([])
  }
  async function handleDestroy (model: string) {
    await openAI.deleteModel(model)
    setItems([
      ...items.filter((item) => item.model === model)
    ])
  }

  useEffect(() => {
    fetchItems().catch(console.error)
  })

  return (
    <StyledSection>
      <h2>Fine Tune List</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Model name</th>
            <th>Base model name</th>
            <th>Status</th>
            <th>Training files</th>
            <th>Created at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, index) => (
            <>
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.fine_tuned_model}</td>
                <td>{row.model}</td>
                <td>{row.status}</td>
                <td>{row.training_files.map((row) => row.filename).join('\n')}</td>
                <td>{dayjs.unix(row.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>
                  {openId === row.id ? (
                    <button type="button" onClick={handleHideEvents}>
                      Hide events
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSeeEvents(row.id)}
                    >
                      See events
                    </button>
                  )}
                  {row.status !== 'pending' && (
                    <button
                      type="button"
                      onClick={() => handleDestroy(row.model)}
                    >
                      &times;
                    </button>
                  )}
                </td>
              </tr>
              {events && openId === row.id && (
                <tr>
                  <td colSpan={7}>
                    <table>
                      <thead>
                        <th>Level</th>
                        <th>Message</th>
                      </thead>
                      <tbody>
                        {events.map((eventRow, eventRowIndex) => (
                          <tr key={eventRowIndex}>
                            <td>{eventRow.level}</td>
                            <td>{eventRow.message}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </StyledSection>
  )
}

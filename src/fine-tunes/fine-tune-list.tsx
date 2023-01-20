import type { FineTune, FineTuneEvent } from 'openai'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { useState, Fragment } from 'react'
import openAI from '@/openai'

type FineTuneListProps = {
  items: FineTune[]
  onCancel?: (id: string) => void
  onDestroy?: (id: string) => void
}

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

export default function ({ items = [], onCancel, onDestroy }: FineTuneListProps) {
  const [openId, setOpenId] = useState('')
  const [events, setEvents] = useState<FineTuneEvent[]>([])

  async function handleSeeEvents (id: string) {
    const { data } = await openAI.listFineTuneEvents(id)
    setOpenId(id)
    setEvents(data.data)
  }
  function handleHideEvents () {
      setOpenId('')
      setEvents([])
  }

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
            <Fragment key={index}>
              <tr>
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
                  {row.status === 'pending' && (
                    <>
                      {' '}
                      <button
                        type="button"
                        onClick={() => onCancel && onCancel(row.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {row.fine_tuned_model && (
                    <>
                      {' '}
                      <button
                        type="button"
                        onClick={() => onDestroy && onDestroy(row.fine_tuned_model || '')}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
              {events && openId === row.id && (
                <tr>
                  <td colSpan={7}>
                    <table>
                      <thead>
                        <tr>
                          <th>Level</th>
                          <th>Message</th>
                          <th>Created at</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((eventRow, eventRowIndex) => (
                          <tr key={eventRowIndex}>
                            <td>{eventRow.level}</td>
                            <td>{eventRow.message}</td>
                            <td>
                              {
                                dayjs
                                  .unix(eventRow.created_at)
                                  .format('YYYY-MM-DD HH:mm:ss')
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </StyledSection>
  )
}

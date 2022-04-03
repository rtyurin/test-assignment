import React, { useEffect, useState } from 'react'
import { ChatBox } from './components/ChatBox'
import { IMessage } from './types'

type ResponseT = {
  result: {
    messages: IMessage[]
  }
}

function App() {
  const [data, setData] = useState<null | ResponseT>(null)
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch(`http://localhost:3001/messages?chatId=123`)
      .then((res) => res.json())
      .then((res: ResponseT) => {
        setData(res)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              {data?.result.messages && (
                <ChatBox messages={data?.result.messages} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default App

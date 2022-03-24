import React, { useEffect, useState } from 'react'
import { Message } from './components/Message'
import { ChatBox } from './components/ChatBox'
import { IMessage } from './types'
import { Input } from './components/Input'

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
    fetch('http://localhost:3001/messages')
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

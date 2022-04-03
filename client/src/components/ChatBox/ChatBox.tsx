import { FormEvent, useCallback, useState } from 'react'
import styles from './ChatBox.module.css'
import { IMessage, IUser } from '../../types'
import { Message } from '../Message'
import { Input } from '../Input'
import { Button } from '../Button'

interface IChatBoxProps {
  messages: IMessage[]
}

const userAuthor: IUser = {
  id: '1',
  name: 'You',
  icon: 'https://i.pravatar.cc/300?img=1',
}
export const ChatBox = ({ messages }: IChatBoxProps) => {
  const [messagesState, setMessagesState] = useState(messages)
  const [inputValue, setInputValue] = useState('')

  const onMessageSend = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      fetch('http://localhost:3001/message', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorId: 1,
          chatId: 123,
          message: inputValue,
          id: new Date().getTime(),
          createdTimestamp: new Date().getTime(),
        }),
      })
        .then(() => console.log('sent'))
        .catch(() => console.log('error'))

      setMessagesState((prevMessages) => [
        ...prevMessages,
        {
          author: userAuthor,
          message: inputValue,
          id: new Date().getTime(),
          createdTimestamp: new Date().getTime(),
        },
      ])
      setInputValue('')
    },
    [inputValue]
  )

  return (
    <div className={styles.wrapper}>
      <ul className={styles.messagesBox}>
        {messagesState.map((message) => (
          <Message
            key={message.id}
            userName={message.author.name}
            userAvatar={message.author.icon}
            createdTimestamp={message.createdTimestamp}
            text={message.message}
          />
        ))}
      </ul>
      <form className={styles.sendField} onSubmit={onMessageSend}>
        <Input
          placeholder={'enter new message'}
          onChange={setInputValue}
          value={inputValue}
        />
        <Button type="submit" text={'Send'} />
      </form>
    </div>
  )
}

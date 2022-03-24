import styles from './Message.module.css'
import { Author } from '../Author'

interface MessageProps {
  text: string
  userName: string
  userAvatar: string
  createdTimestamp: number
}

export const Message = ({
  text,
  userAvatar,
  userName,
  createdTimestamp,
}: MessageProps) => {
  return (
    <li className={styles.wrapper}>
      <Author
        name={userName}
        avatar={userAvatar}
        createdTimestamp={createdTimestamp}
      />
      {text}
    </li>
  )
}

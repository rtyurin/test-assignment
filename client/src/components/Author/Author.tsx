import styles from './Author.module.css'

interface IAuthorProps {
  name: string
  avatar: string
  createdTimestamp: number
}
export const Author = ({ avatar, name, createdTimestamp }: IAuthorProps) => {
  return (
    <div className={styles.author}>
      <img
        className={styles.icon}
        width={24}
        height={24}
        src={avatar}
        alt={name}
      />
      <div>{name}</div>
      <div className={styles.createdAt}>
        {new Date(createdTimestamp).toLocaleTimeString()}
      </div>
    </div>
  )
}

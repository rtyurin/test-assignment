import styles from './Button.module.css'

interface IButtonProps {
  onClick?: () => void
  text: string
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
}

export const Button = ({ disabled, text, type, onClick }: IButtonProps) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

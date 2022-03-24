import React, { useCallback } from 'react'
import styles from './Input.module.css'

interface IInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export const Input = ({ value, onChange, placeholder }: IInputProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    },
    [onChange]
  )

  return (
    <input
      type="text"
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  )
}

import { useState } from 'react'

export const useField = (type: string = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (e) => setValue(e.target.value)
  const onReset = () => setValue('')

  return {
    type,
    value,
    onChange,
    onReset,
  }
}

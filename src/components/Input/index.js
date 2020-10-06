import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react'
import { useField } from '@unform/core'

import { Container, TextInput, Icon } from './styles'

const Input = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef(null)

  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef({ value: defaultValue })

  const [isFocused, setIsfocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsfocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsfocused(false)
    setIsFilled(!!inputValueRef.current?.value)
  }, [])

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus()
    },
  }))

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      },
    })
  }, [fieldName, registerField])

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? 'grey' : '#e6c315'}
      />
      <TextInput
        ref={inputElementRef}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        defaultValue={defaultValue}
        keyboardAppearance="dark"
        placeholderTextColor="grey"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input)

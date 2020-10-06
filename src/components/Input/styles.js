import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-width: 2px;
  border-color: #e6c315;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  ${props =>
    props.isErrored &&
    css`
      border-color: #e6c315;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: #e6c315;
    `}
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 16px;
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`

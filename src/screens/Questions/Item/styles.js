import styled from 'styled-components'

export const FlatListStyled = styled.FlatList`
  flex-basis: 0;
`

export const ViewStyled = styled.View`
  min-height: 80px;
  width: 100%;
  margin-top: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => (props.colorText ? props.colorText : '#353A3E')};
`

export const ButtonStyled = styled.TouchableOpacity`
  border: 1px;
  border-color: #e6c315;
  border-radius: 10px;
  flex-basis: 23%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-right: 5px;
`

export const TextStyled = styled.Text`
  font-size: 9px;
`

import styled from 'styled-components'

export const ViewStyled = styled.View`
  min-height: 80px;
  width: 100%;
  margin-top: 5px;
  border: 1px;
  flex-direction: row;
  align-items: center;
  border-color: #e6c315;
  border-radius: 10px;
  color: ${props => (props.colorText ? props.colorText : '#353A3E')};
`

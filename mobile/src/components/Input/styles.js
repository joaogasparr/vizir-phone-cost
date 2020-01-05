import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  height: 46px;
  padding: 0 15px;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  flex: 1;

  margin-left: 10px;
  font-size: 15px;
  color: #fff;
`;

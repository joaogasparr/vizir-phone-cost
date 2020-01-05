import styled from 'styled-components/native';

export const Content = styled.View`
  background: #fff;
  height: 290px;
  padding: 20px;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Transparency = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 30px;
`;

export const TransparencyTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444444;
  line-height: 16px;
`;

export const TransparencyText = styled.Text`
  font-size: 14px;
  color: #666666;
  line-height: 16px;
`;

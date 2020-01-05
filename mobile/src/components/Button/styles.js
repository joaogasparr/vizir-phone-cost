import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 46px;
  background: #21507c;
  border-radius: 4px;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

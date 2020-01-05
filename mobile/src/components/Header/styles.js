import { Platform } from 'react-native';
import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #21507c;
  height: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + ifIphoneX(64, 44)
    : 54}px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 130px;
  height: 35px;
`;

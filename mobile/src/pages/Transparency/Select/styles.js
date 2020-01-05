import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 20px;
`;

export const NewButton = styled(Button)`
  align-self: stretch;
`;

export const TitleText = styled.Text`
  align-self: center;

  margin: 20px 0 20px;

  font-size: 20px;
  font-weight: bold;

  color: #fff;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})`
  align-self: stretch;
`;

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

export const TitleText = styled.Text`
  align-self: center;

  margin: 20px 0 20px;

  font-size: 20px;
  font-weight: bold;

  color: #fff;
`;

export const NewButton = styled(Button)`
  align-self: stretch;
`;

export const RateList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const Content = styled.TouchableOpacity`
  background: #fff;
  margin-bottom: 10px;
  padding: 15px 20px;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const RateHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: #fff;
`;

export const RateTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444444;

  margin-left: 8px;
`;

export const RateBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: #fff;

  margin-top: 10px;
`;

export const RateText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #666666;

  margin-left: 8px;
`;

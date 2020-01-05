import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Header from '~/components/Header';

import Result from './Result';

import { Container } from './styles';

export default function Show({ navigation }) {
  const transparency = navigation.getParam('data');

  return (
    <Background>
      <Header />
      <Container>
        <Result data={transparency} />
      </Container>
    </Background>
  );
}

Show.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('TransparencySelect');
      }}>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});

Show.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

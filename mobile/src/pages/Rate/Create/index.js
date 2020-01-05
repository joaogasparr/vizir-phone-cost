import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import PickerSelect from '~/components/PickerSelect';

import { Container, Title, Form, FormInput, SubmitButton } from './styles';

export default function Create({ navigation }) {
  const rate = navigation.getParam('data');

  const [states, setStates] = useState([]);
  const [origin, setOrigin] = useState(rate.origin);
  const [destiny, setDestiny] = useState(rate.destiny);
  const [price, setPrice] = useState(rate.price ? rate.price : '');

  useEffect(() => {
    async function loadStates() {
      try {
        const response = await api.get('/states');

        const data = response.data.map(state => ({
          label: `${state.ddd} - ${state.title}`,
          value: state.id,
        }));

        setStates(data);
      } catch (err) {
        Alert.alert('Atenção', err.response.data.error);
      }
    }

    loadStates();
  }, []);

  async function newRate() {
    try {
      await api.post('/rates', {
        origin_id: origin,
        destiny_id: destiny,
        price,
      });

      Alert.alert('Atenção', 'Taxa cadastrada com sucesso!');
      navigation.navigate('RateList');
    } catch (err) {
      Alert.alert('Atenção', err.response.data.error);
    }
  }

  async function updateRate() {
    try {
      await api.put(`/rates/${rate.id}`, {
        origin_id: origin,
        destiny_id: destiny,
        price,
      });

      Alert.alert('Atenção', 'Taxa atualizada com sucesso!');
      navigation.navigate('RateList');
    } catch (err) {
      Alert.alert('Atenção', err.response.data.error);
    }
  }

  function handleSubmit() {
    if (rate) {
      updateRate();
    } else {
      newRate();
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <Title>{rate ? 'Edição de taxa' : 'Cadastro de taxa'}</Title>
        <Form>
          <PickerSelect
            icon="my-location"
            placeholder="Selecione um DDD"
            items={states}
            value={origin}
            onValueChange={value => setOrigin(value)}
          />

          <PickerSelect
            icon="my-location"
            placeholder="Selecione um DDD"
            items={states}
            value={destiny}
            onValueChange={value => setDestiny(value)}
          />

          <FormInput
            icon="monetization-on"
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Preço"
            value={String(price)}
            onChangeText={setPrice}
          />

          <SubmitButton onPress={handleSubmit}>Salvar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

Create.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('RateList');
      }}>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});

Create.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

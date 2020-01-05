import React, { useState, useRef } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container, Title, Form, FormInput, SubmitButton } from './styles';

export default function Create({ navigation }) {
  const plan = navigation.getParam('data');

  const [title, setTitle] = useState(plan.title);
  const [duration, setDuration] = useState(plan ? plan.duration : '');

  const durationRef = useRef();

  async function newPlan() {
    try {
      await api.post('/plans/', { title, duration });

      Alert.alert('Atenção', 'Plano cadastrado com sucesso!');
      navigation.navigate('PlanList');
    } catch (err) {
      Alert.alert('Atenção', err.response.data.error);
    }
  }

  async function updatePlan() {
    try {
      await api.put(`/plans/${plan.id}`, { title, duration });

      Alert.alert('Atenção', 'Plano atualizado com sucesso!');
      navigation.navigate('PlanList');
    } catch (err) {
      Alert.alert('Atenção', err.response.data.error);
    }
  }

  function handleSubmit() {
    if (plan) {
      updatePlan();
    } else {
      newPlan();
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <Title>{plan ? 'Edição de plano' : 'Cadastro de plano'}</Title>
        <Form>
          <FormInput
            icon="font-download"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Descrição do Plano"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
            onSubmitEditing={() => durationRef.current.focus()}
          />

          <FormInput
            icon="schedule"
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Tempo"
            value={String(duration)}
            onChangeText={setDuration}
            ref={durationRef}
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
        navigation.navigate('PlanList');
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

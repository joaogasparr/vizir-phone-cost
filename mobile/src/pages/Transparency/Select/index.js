import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Input from '~/components/Input';
import PickerSelect from '~/components/PickerSelect';

import { Container, Title, TitleText, NewButton, Form } from './styles';

export default function Select({ navigation }) {
  const [states, setStates] = useState([]);
  const [origin, setOrigin] = useState();
  const [destiny, setDestiny] = useState();
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState();
  const [duration, setDuration] = useState();

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

    async function loadPlans() {
      try {
        const response = await api.get('/plans');

        const data = response.data.plans.map(plan => ({
          label: plan.title,
          value: plan.id,
        }));

        setPlans(data);
      } catch (err) {
        Alert.alert('Atenção', err.response.data.error);
      }
    }

    loadStates();
    loadPlans();
  }, []);

  async function handleSubmit() {
    try {
      const { data } = await api.post('/transparencies', {
        origin_id: origin,
        destiny_id: destiny,
        duration,
        plan,
      });

      navigation.navigate('TransparencyShow', { data });
    } catch (err) {
      Alert.alert('Atenção', err.response.data.error);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <Title>
          <TitleText>Transparência</TitleText>
          <NewButton onPress={handleSubmit}>CALCULAR</NewButton>
        </Title>
        <Form>
          <PickerSelect
            icon="my-location"
            placeholder="Selecione um DDD"
            items={states}
            onValueChange={value => setOrigin(value)}
          />

          <PickerSelect
            icon="my-location"
            placeholder="Selecione um DDD"
            items={states}
            onValueChange={value => setDestiny(value)}
          />

          <PickerSelect
            icon="storage"
            placeholder="Selecione um plano"
            onValueChange={value => setPlan(value)}
            items={plans}
          />

          <Input
            icon="schedule"
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Tempo"
            value={duration}
            onChangeText={setDuration}
          />
        </Form>
      </Container>
    </Background>
  );
}

Select.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

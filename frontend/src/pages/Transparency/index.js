import React, { useState, useCallback } from 'react';
import { AiFillCalculator } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';

import api from '~/services/api';

import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import Header from '~/components/Title';
import SelectInput from '~/components/SelectInput';

import Result from './Result';

import { Container, Content } from './styles';

export default function Transparency() {
  const [transparencies, setTransparencies] = useState([]);
  const [states, setStates] = useState([]);
  const [plans, setPlans] = useState([]);
  const [calcular, setCalcular] = useState(false);

  const loadStateOptions = useCallback(async inputValue => {
    try {
      const response = await api.get('/states');

      const data = response.data.map(state => ({
        id: state.id,
        title: `${state.ddd} - ${state.title}`,
      }));

      setStates(data);
      return data;
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }, []);

  const loadPlanOptions = useCallback(async inputValue => {
    try {
      const { data } = await api.get('/plans');

      setPlans(data.plans);
      return data.plans;
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }, []);

  async function handleSubmit({ origin_id, destiny_id, plan, duration }) {
    try {
      const { data } = await api.post('/transparencies', {
        origin_id,
        destiny_id,
        duration,
        plan,
      });

      setTransparencies(data);
      setCalcular(true);
    } catch (err) {
      toast.error(err.response.data.error);
      setCalcular(false);
    }
  }

  return (
    <Container>
      {calcular ? (
        <Result data={transparencies} onClick={() => setCalcular(false)} />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Header text="Transparências">
            <Button
              type="submit"
              text="CALCULAR"
              color="#21507c"
              icon={<AiFillCalculator size={20} color="#FFF" />}
            />
          </Header>
          <Content>
            <SelectInput
              name="origin_id"
              label="ORIGEM (DDD)"
              placeholder="Buscar DDD"
              options={states}
              noOptionsMessage={() => 'Nenhum DDD foi encontrado...'}
              loadOptions={loadStateOptions}
              cacheOptions
            />
            <SelectInput
              name="destiny_id"
              label="DESTINO (DDD)"
              placeholder="Buscar DDD"
              options={states}
              noOptionsMessage={() => 'Nenhum DDD foi encontrado...'}
              loadOptions={loadStateOptions}
              cacheOptions
            />
            <SelectInput
              name="plan"
              label="PLANO"
              placeholder="Buscar plano"
              options={plans}
              noOptionsMessage={() => 'Nenhum plano foi encontrado...'}
              loadOptions={loadPlanOptions}
              cacheOptions
            />
            <TextInput name="duration" type="number" label="DURAÇÃO" />
          </Content>
        </Form>
      )}
    </Container>
  );
}

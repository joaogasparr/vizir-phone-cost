import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Plan';

import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import Header from '~/components/Title';

import { Container, Content } from './styles';

export default function Create() {
  const [plans, setPlans] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function loadPlan() {
      try {
        const { data } = await api.get(`/plans/${id}`);

        setPlans(data);
      } catch (err) {
        toast.error(err.response.data.error);
        history.push('/plan');
      }
    }

    if (id) {
      loadPlan();
    }
  }, [id]);

  async function newPlan(data) {
    try {
      await api.post('/plans', data);

      toast.success(`O Plano foi cadastrado com sucesso!`);

      history.push('/plan');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function updatePlan(data) {
    try {
      await api.put(`/plans/${id}`, data);

      toast.success(`O Plano foi alterado com sucesso!`);

      history.push('/plan');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function handleSubmit({ title, duration }) {
    if (id) {
      await updatePlan({ title, duration });
    } else {
      await newPlan({ title, duration });
    }
  }

  return (
    <Container>
      <Form initialData={plans} schema={schema} onSubmit={handleSubmit}>
        <Header text={id ? 'Edição de plano' : 'Cadastro de plano'}>
          <Link to="/plan">
            <Button
              type="button"
              text="VOLTAR"
              color="#CCCCCC"
              icon={<MdKeyboardArrowLeft size={20} color="#FFF" />}
            />
          </Link>

          <Button
            type="submit"
            text="SALVAR"
            color="#21507c"
            icon={<MdDone size={20} color="#FFF" />}
          />
        </Header>
        <Content>
          <TextInput name="title" type="text" label="TÍTULO DO PLANO" />
          <TextInput
            name="duration"
            type="number"
            label="DURAÇÃO (EM MINUTOS)"
          />
        </Content>
      </Form>
    </Container>
  );
}

Create.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Create.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};

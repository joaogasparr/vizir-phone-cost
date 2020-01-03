import React, { useState, useEffect, useCallback } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Rate';

import Button from '~/components/Button';
import Content from '~/components/Content';
import NumberInput from '~/components/NumberFormat';
import SelectInput from '~/components/SelectInput';
import Header from '~/components/Title';

import { Container } from './styles';

export default function Create() {
  const [rates, setRates] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedDestiny, setSelectedDestiny] = useState([]);
  const [price, setPrice] = useState();
  const { id } = useParams();

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

  useEffect(() => {
    async function loadRate() {
      try {
        const { data } = await api.get(`/rates/${id}`);

        const origin = [
          ...states,
          {
            id: data.origin.id,
            title: `${data.origin.ddd} - ${data.origin.title}`,
          },
        ];

        setSelectedOrigin(origin);

        const destiny = [
          ...states,
          {
            id: data.destiny.id,
            title: `${data.destiny.ddd} - ${data.destiny.title}`,
          },
        ];

        setSelectedDestiny(destiny);

        setPrice(data.price);

        setRates({
          id: data.id,
          origin_id: data.origin.id,
          destiny_id: data.destiny.id,
        });
      } catch (err) {
        toast.error(err.response.data.error);
        history.push('/rate');
      }
    }

    if (id) {
      loadRate();
    }

    loadStateOptions();
  }, [id]);

  async function newRate(data) {
    try {
      await api.post('/rates', data);

      toast.success(`A Taxa foi cadastrada com sucesso!`);

      history.push('/rate');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function updateRate(data) {
    try {
      await api.put(`/rates/${id}`, data);

      toast.success(`A Taxa foi alterada com sucesso!`);

      history.push('/rate');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function handleSubmit({
    origin_id,
    destiny_id,
    price: priceFormatted,
  }) {
    const price = priceFormatted.replace('US$', '');

    if (id) {
      await updateRate({ origin_id, destiny_id, price });
    } else {
      await newRate({ origin_id, destiny_id, price });
    }
  }

  return (
    <Container>
      <Form initialData={rates} schema={schema} onSubmit={handleSubmit}>
        <Header text={id ? 'Edição de taxa' : 'Cadastro de taxa'}>
          <Link to="/rate">
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
          <SelectInput
            name="origin_id"
            label="ORIGEM (DDD)"
            placeholder="Buscar DDD"
            options={states}
            onChange={setSelectedOrigin}
            noOptionsMessage={() => 'Nenhum DDD foi encontrado...'}
            loadOptions={loadStateOptions}
            cacheOptions
          />
          <SelectInput
            name="destiny_id"
            label="DESTINO (DDD)"
            placeholder="Buscar DDD"
            options={states}
            onChange={setSelectedDestiny}
            noOptionsMessage={() => 'Nenhum DDD foi encontrado...'}
            loadOptions={loadStateOptions}
            cacheOptions
          />
          <NumberInput
            name="price"
            label="PREÇO POR MINUTO"
            value={price}
            onChange={setPrice}
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

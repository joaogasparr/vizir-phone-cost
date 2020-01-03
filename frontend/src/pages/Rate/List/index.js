import React, { useState, useEffect } from 'react';
import { MdAdd, MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

import Button from '~/components/Button';
import Content from '~/components/Content';
import Header from '~/components/Title';
import { Footer, FooterButton } from '~/components/Table';

import { Container, RateTable, ShimmerLine } from './styles';

export default function List() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    async function loadRates() {
      try {
        setLoading(true);

        const response = await api.get('/rates', {
          params: {
            page,
          },
        });

        const data = response.data.rates.map(rate => ({
          id: rate.id,
          origin: rate.origin.ddd,
          destiny: rate.destiny.ddd,
          price: formatPrice(rate.price),
        }));

        setRates(data);
        setLastPage(response.data.count || 1);
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setLoading(false);
      }
    }

    loadRates();
  }, [page]);

  function handlePage(action) {
    const data = action === 'back' ? page - 1 : page + 1;
    setPage(data);
  }

  async function handleConfirmDeleteRate(id) {
    if (window.confirm('Deseja realmente excluir ?')) {
      try {
        await api.delete(`/rates/${id}`);

        const response = rates.filter(rate => rate.id !== id);

        setRates(response);

        toast.success('A Taxa foi excluída com sucesso!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Header text="Gerenciando taxas">
        <Link to="/rate/create">
          <Button
            type="submit"
            text="CADASTRAR"
            color="#21507c"
            icon={<MdAdd size={20} color="#FFF" />}
          />
        </Link>
      </Header>
      <Content>
        <RateTable>
          <thead>
            <tr>
              <th>ORIGEM (DDD)</th>
              <th>DESTINO (DDD)</th>
              <th>PREÇO</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rates.map(rate => (
              <tr key={rate.id}>
                <td>{rate.origin}</td>
                <td>{rate.destiny}</td>
                <td>{rate.price}</td>
                <td>
                  <div>
                    <Link to={`/rate/${rate.id}`}>
                      <button type="button">editar</button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleConfirmDeleteRate(rate.id)}
                    >
                      apagar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </RateTable>
        <Footer>
          <FooterButton
            name="next"
            color="#FFF"
            icon={<MdArrowBack size={20} color="#7159c1" />}
            limitPage={page === 1}
            onClick={() => handlePage('back')}
          />
          <span>Página {page}</span>
          <FooterButton
            name="next"
            color="#FFF"
            icon={<MdArrowForward size={20} color="#7159c1" />}
            limitPage={page === lastPage}
            onClick={() => handlePage('next')}
          />
        </Footer>
      </Content>
    </Container>
  );
}

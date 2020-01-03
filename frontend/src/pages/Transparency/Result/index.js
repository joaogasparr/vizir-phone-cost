import React, { useMemo } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import PropTypes from 'prop-types';

import { formatPrice } from '~/util/format';

import Content from '~/components/Content';
import Header from '~/components/Title';
import Button from '~/components/Button';

import { TransparencyTable } from './styles';

export default function Result({ data, onClick }) {
  const priceWithFaleMais = useMemo(() => {
    return formatPrice(data.priceWithFaleMais);
  }, [data]);

  const priceWithOutFaleMais = useMemo(() => {
    return formatPrice(data.priceWithOutFaleMais);
  }, [data]);

  return (
    <>
      <Header text="Transparências">
        <Button
          type="button"
          text="VOLTAR"
          color="#21507c"
          onClick={onClick}
          icon={<MdKeyboardArrowLeft size={20} color="#FFF" />}
        />
      </Header>
      <Content>
        <TransparencyTable>
          <thead>
            <tr>
              <th>ORIGEM</th>
              <th>DESTINO</th>
              <th>TEMPO (EM MINUTOS)</th>
              <th>PLANO FALEMAIS</th>
              <th>COM FALEMAIS</th>
              <th>SEM FALEMAIS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.origin}</td>
              <td>{data.destiny}</td>
              <td>{data.duration}</td>
              <td>{data.plan}</td>
              <td>{priceWithFaleMais}</td>
              <td>{priceWithOutFaleMais}</td>
            </tr>
          </tbody>
        </TransparencyTable>
      </Content>
    </>
  );
}

Result.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

Result.defaultProps = {
  onClick: null,
};

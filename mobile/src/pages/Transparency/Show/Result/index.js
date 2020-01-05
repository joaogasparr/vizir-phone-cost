import React, { useMemo } from 'react';

import PropTypes from 'prop-types';

import { formatPrice } from '~/util/format';

import {
  Content,
  Transparency,
  TransparencyTitle,
  TransparencyText,
} from './styles';

export default function Result({ data }) {
  const priceWithFaleMais = useMemo(() => {
    return formatPrice(data.priceWithFaleMais);
  }, [data]);

  const priceWithOutFaleMais = useMemo(() => {
    return formatPrice(data.priceWithOutFaleMais);
  }, [data]);

  return (
    <Content>
      <Transparency>
        <TransparencyTitle>ORIGEM</TransparencyTitle>
        <TransparencyText>{data.origin}</TransparencyText>
      </Transparency>
      <Transparency>
        <TransparencyTitle>DESTINO</TransparencyTitle>
        <TransparencyText>{data.destiny}</TransparencyText>
      </Transparency>
      <Transparency>
        <TransparencyTitle>DURAÇÃO (EM MINUTOS)</TransparencyTitle>
        <TransparencyText>{data.duration}</TransparencyText>
      </Transparency>
      <Transparency>
        <TransparencyTitle>PLANO FALEMAIS</TransparencyTitle>
        <TransparencyText>{data.plan}</TransparencyText>
      </Transparency>
      <Transparency>
        <TransparencyTitle>COM FALEMAIS</TransparencyTitle>
        <TransparencyText>{priceWithFaleMais}</TransparencyText>
      </Transparency>
      <Transparency>
        <TransparencyTitle>SEM FALEMAIS</TransparencyTitle>
        <TransparencyText>{priceWithOutFaleMais}</TransparencyText>
      </Transparency>
    </Content>
  );
}

Result.propTypes = {
  data: PropTypes.shape({
    origin: PropTypes.number.isRequired,
    destiny: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
    priceWithFaleMais: PropTypes.number.isRequired,
    priceWithOutFaleMais: PropTypes.number.isRequired,
  }).isRequired,
};

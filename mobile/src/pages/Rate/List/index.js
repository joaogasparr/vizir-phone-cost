import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import PropTypes from 'prop-types';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Title,
  TitleText,
  NewButton,
  RateList,
  Content,
  RateHeader,
  RateBody,
  RateTitle,
  RateText,
} from './styles';

function List({ navigation, isFocused }) {
  const [rates, setRates] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  async function loadRates(pagination = 1, refresh = false) {
    try {
      if (loadMore || refresh) {
        if (refresh) {
          setRefreshing(true);
          setLoadMore(true);
          setRates([]);
        }

        const response = await api.get('/rates', {
          params: {
            page: pagination,
          },
        });

        if (!response.data.count) {
          setLoadMore(false);
        }

        const dataFormatted = response.data.rates.map(rate => ({
          id: rate.id,
          origin: rate.origin.id,
          origin_ddd: rate.origin.ddd,
          destiny: rate.destiny.id,
          destiny_ddd: rate.destiny.ddd,
          price: rate.price,
          priceFormatted: formatPrice(rate.price),
        }));

        const data =
          pagination >= 2 ? [...rates, ...dataFormatted] : dataFormatted;

        setRates(data);
        setPage(pagination);
      }
    } catch (err) {
      Alert.alert('Atenção', err.response.data.error);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadRates();
  }, [isFocused]);

  function handleLoadMore() {
    if (loadMore && !refreshing) {
      const nextPage = page + 1;
      loadRates(nextPage);
    }
  }

  function handleSubmit(data) {
    navigation.navigate('RateCreate', { data });
  }

  return (
    <Background>
      <Header />
      <Container>
        <Title>
          <TitleText>Gerenciamento de taxas</TitleText>
          <NewButton onPress={handleSubmit}>CADASTRAR</NewButton>
        </Title>
        <RateList
          data={rates}
          refreshing={refreshing}
          onRefresh={() => loadRates(1, true)}
          onEndReachedThreshold={0.2}
          onEndReached={handleLoadMore}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Content onPress={() => handleSubmit(item)}>
              <RateHeader>
                <RateTitle>ORIGEM</RateTitle>
                <RateTitle>DESTINO</RateTitle>
                <RateTitle>PREÇO</RateTitle>
              </RateHeader>
              <RateBody>
                <RateText>{item.origin_ddd}</RateText>
                <RateText>{item.destiny_ddd}</RateText>
                <RateText>{item.priceFormatted}</RateText>
              </RateBody>
            </Content>
          )}
        />
      </Container>
    </Background>
  );
}

List.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(List);

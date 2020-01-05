import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { withNavigationFocus } from 'react-navigation';

import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Title,
  TitleText,
  NewButton,
  PlanList,
  Content,
  PlanHeader,
  PlanBody,
  PlanTitle,
  PlanText,
} from './styles';

function List({ navigation, isFocused }) {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  async function loadPlans(pagination = 1, refresh = false) {
    try {
      if (loadMore || refresh) {
        if (refresh) {
          setRefreshing(true);
          setLoadMore(true);
          setPlans([]);
        }

        const response = await api.get('/plans', {
          params: {
            page: pagination,
          },
        });

        if (!response.data.count) {
          setLoadMore(false);
        }

        const data =
          pagination >= 2
            ? [...plans, ...response.data.plans]
            : response.data.plans;

        setPlans(data);
        setPage(pagination);
      }
    } catch (err) {
      Alert.alert('Atenção', err.response.data.error);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadPlans();
  }, [isFocused]);

  function handleLoadMore() {
    if (loadMore && !refreshing) {
      const nextPage = page + 1;
      loadPlans(nextPage);
    }
  }

  function handleSubmit(data) {
    navigation.navigate('PlanCreate', { data });
  }

  return (
    <Background>
      <Header />
      <Container>
        <Title>
          <TitleText>Gerenciamento de planos</TitleText>
          <NewButton onPress={handleSubmit}>CADASTRAR</NewButton>
        </Title>
        <PlanList
          data={plans}
          refreshing={refreshing}
          onRefresh={() => loadPlans(1, true)}
          onEndReachedThreshold={0.2}
          onEndReached={handleLoadMore}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Content onPress={() => handleSubmit(item)}>
              <PlanHeader>
                <PlanTitle>TÍTULO</PlanTitle>
                <PlanTitle>DURAÇÃO (EM MINUTOS)</PlanTitle>
              </PlanHeader>
              <PlanBody>
                <PlanText>{item.title}</PlanText>
                <PlanText>{item.duration}</PlanText>
              </PlanBody>
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

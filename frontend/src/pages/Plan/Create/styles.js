import styled from 'styled-components';

import ContentWrapper from '~/components/Content';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  max-width: 900px;
  margin: 30px auto;
`;

export const Content = styled(ContentWrapper)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 20px;

  input {
    margin-bottom: 10px;
  }
`;

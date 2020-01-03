import styled from 'styled-components';

import ContentWrapper from '~/components/Content';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  max-width: 800px;
  margin: 30px auto;

  hr {
    border: 0;
    height: 1px;
    background: #eee;
    margin: 10px 0 20px;
  }
`;

export const Content = styled(ContentWrapper)`
  button {
    width: 100%;

    & + button {
      margin-top: 20px;
    }
  }
`;

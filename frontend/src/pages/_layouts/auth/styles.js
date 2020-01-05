import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #21507c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 360px;
  width: 100%;

  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      color: #fff;
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    button {
      font-size: 16px;
      line-height: 19px;
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

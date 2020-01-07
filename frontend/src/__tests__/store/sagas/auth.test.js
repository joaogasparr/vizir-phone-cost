import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';
import { runSaga } from 'redux-saga';

import api from '~/services/api';
import * as Actions from '~/store/modules/auth/actions';
import * as Sagas from '~/store/modules/auth/sagas';

const apiMock = new MockAdapter(api);

describe('Auth Sagas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to authenticate', async () => {
    const dispatch = jest.fn();

    const email = faker.internet.email();
    const password = faker.internet.password();

    const data = {
      user: {
        id: 1,
        name: faker.name.findName(),
        email,
      },
      token: faker.random.words(),
    };

    apiMock.onPost('/sessions').reply(200, data);

    await runSaga({ dispatch }, Sagas.signIn, {
      payload: { email, password },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      Actions.signInSucess(data.token, data.user)
    );
  });

  it('should fail when authentication returns error', async () => {
    const dispatch = jest.fn();

    apiMock.onPost('/sessions').reply(500, { error: 'Error' });

    await runSaga({ dispatch }, Sagas.signIn, {
      payload: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(Actions.signFailure());
  });

  it('should be able to register new user', async () => {
    const dispatch = jest.fn();

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const data = {
      id: 1,
      name,
      email,
    };

    apiMock.onPost('/users').reply(200, data);

    await runSaga({ dispatch }, Sagas.signUp, {
      payload: { name, email, password },
    }).toPromise();
  });

  it('should fail when register a new user returns error', async () => {
    const dispatch = jest.fn();

    apiMock.onPost('/users').reply(500, { error: 'Error' });

    await runSaga({ dispatch }, Sagas.signUp, {
      payload: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(Actions.signFailure());
  });
});

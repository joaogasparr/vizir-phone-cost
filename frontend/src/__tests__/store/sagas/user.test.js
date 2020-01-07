import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';
import { runSaga } from 'redux-saga';

import api from '~/services/api';
import * as Actions from '~/store/modules/user/actions';
import * as Sagas from '~/store/modules/user/sagas';

const apiMock = new MockAdapter(api);

describe('User Sagas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to update a user', async () => {
    const dispatch = jest.fn();

    const name = faker.name.findName();
    const email = faker.internet.email();

    apiMock.onPut('/users').reply(200, { name, email });

    await runSaga({ dispatch }, Sagas.updateProfile, {
      payload: { data: { name, email } },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      Actions.updateProfileSucess({ name, email })
    );
  });

  it('should fail when api returns error', async () => {
    const dispatch = jest.fn();

    apiMock.onPut('/users').reply(500, { error: 'Error' });

    await runSaga({ dispatch }, Sagas.updateProfile, {
      payload: {
        data: { name: faker.name.findName(), email: faker.internet.email() },
      },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(Actions.updateProfileFailure());
  });
});

import faker from 'faker';

import * as Auth from '~/store/modules/auth/actions';
import reducer, { INITIAL_STATE } from '~/store/modules/auth/reducer';

describe('Auth Reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('@auth/SIGN_IN_REQUEST', () => {
    const state = reducer(
      INITIAL_STATE,
      Auth.signInRequest(faker.internet.email(), faker.internet.password())
    );

    expect(state).toStrictEqual({ ...INITIAL_STATE, loading: true });
  });

  it('@auth/SIGN_IN_SUCESS', () => {
    const token = faker.random.word();

    const state = reducer(INITIAL_STATE, Auth.signInSucess(token, null));

    expect(state).toStrictEqual({
      ...INITIAL_STATE,
      signed: true,
      token,
    });
  });

  it('@auth/SIGN_FAILURE', () => {
    const state = reducer(INITIAL_STATE, Auth.signFailure());

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@auth/SIGN_OUT', () => {
    const state = reducer(INITIAL_STATE, Auth.signOut());

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });
});

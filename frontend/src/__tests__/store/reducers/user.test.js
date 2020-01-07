import * as Auth from '~/store/modules/auth/actions';
import * as User from '~/store/modules/user/actions';
import reducer, { INITIAL_STATE } from '~/store/modules/user/reducer';

describe('User Reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('@auth/SIGN_IN_SUCESS', () => {
    const state = reducer(INITIAL_STATE, Auth.signInSucess(null, null));

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@user/UPDATE_PROFILE_SUCESS', () => {
    const state = reducer(INITIAL_STATE, User.updateProfileSucess(null));

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

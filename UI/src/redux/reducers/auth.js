import { AUTH_REQ, AUTH_SUCCESS, AUTH_FAILURE } from '../types';

const initialState = {
    user: {},
    error: '',
    loading: false,
    token: '',
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQ:
            return { ...state, error: '', loading: true, token: '' };

        case AUTH_SUCCESS:
            const data = action.payload;
            return { ...state, error: '', loading: false, user: data, token: data.token };

        case AUTH_FAILURE:
            const error = action.payload;
            return { ...state, loading: false, error: error, token: '' };

        default:
            return state;
    }
}

export default auth;
const initialState = {
  loading: false,
  data: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return { ...state, loading: true, data: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, data: action.data };
    default:
      return { ...state };
  }
};

export default LoginReducer;

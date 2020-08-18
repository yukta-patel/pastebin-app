const initialState = {
  loading: false,
  data: null,
  message: null,
  error: false,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return { ...state, loading: true, data: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, data: action.data };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        message: action.message,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default LoginReducer;

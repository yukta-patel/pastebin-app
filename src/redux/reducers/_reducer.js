const initialState = {
  loading: false,
  data: null,
  addPaste: { loading: false, pastes: null },
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return { ...state, loading: true, data: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, data: action.data };
    case "ADDPASTE_PENDING":
      return { ...state, addPaste: { loading: true, pastes: null } };
    case "ADDPASTE_SUCCESS":
      return { ...state, addPaste: { loading: false, pastes: action.pastes } };
    default:
      return { ...state };
  }
};

export default LoginReducer;

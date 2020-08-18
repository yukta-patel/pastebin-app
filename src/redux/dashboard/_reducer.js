const initialState = {
  loading: false,
  pastes: null,
  message: null,
  error: false,
  getPastes: { loading: false, pastes: null, message: null, error: false },
};

const PasteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDPASTE_PENDING":
      return { ...state, loading: true, pastes: null };
    case "ADDPASTE_SUCCESS":
      return { ...state, loading: false, pastes: action.pastes };
    case "ADDPASTE_FAILURE":
      return {
        ...state,
        loading: false,
        message: action.message,
        error: true,
      };
    case "FETCHPASTES_PENDING":
      return { ...state, getPastes: { loading: true, pastes: null } };
    case "FETCHPASTES_SUCCESS":
      return {
        ...state,
        getPastes: {
          loading: false,
          pastes: action.pastes,
        },
      };
    case "FETCHPASTES_FAILURE":
      return {
        ...state,
        getPastes: {
          loading: false,
          message: action.message,
          error: true,
        },
      };
    default:
      return { ...state };
  }
};

export default PasteReducer;

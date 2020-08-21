const initialState = {
  loading: false,
  pastes: null,
  message: null,
  error: false,
  getPastes: { loading: false, pastes: null, message: null, error: false },
  deletePaste: { loading: false, pastes: null, message: null, error: false },
  getSinglePaste: {
    loading: false,
    pastes: null,
    message: null,
    error: false,
  },
  updatepaste: { loading: false, pastes: null, message: null, error: false },
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
    case "FETCHSINGLEPASTES_PENDING":
      return { ...state, getSinglePaste: { loading: true, pastes: null } };
    case "FETCHSINGLEPASTES_SUCCESS":
      return {
        ...state,
        getSinglePaste: {
          loading: false,
          pastes: action.pastes,
        },
      };
    case "FETCHSINGLEPASTES_FAILURE":
      return {
        ...state,
        getSinglePaste: {
          loading: false,
          message: action.message,
          error: true,
        },
      };
    case "DELETEPASTE_PENDING":
      return { ...state, deletePaste: { loading: true, pastes: null } };
    case "DELETEPASTE_SUCCESS":
      return {
        ...state,
        deletePaste: { loading: false, pastes: action.pastes },
      };
    case "DELETEPASTE_FAILURE":
      return {
        ...state,
        deletePaste: {
          loading: false,
          message: action.message,
          error: true,
        },
      };
    case "UPDATEPASTE_PENDING":
      return { ...state, updatepaste: { loading: true, pastes: null } };
    case "UPDATEPASTE_SUCCESS":
      return {
        ...state,
        updatepaste: { loading: false, pastes: action.pastes },
      };
    case "UPDATEPASTE_FAILURE":
      return {
        ...state,
        updatepaste: {
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

const initialState = {
  plainOptions: ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'],
  checkList: ['Без пересадок'],
  isCheapest: true,
  tickets: [],
  isLoading: false,
  isError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHECK':
    return {
      ...state,
      checkList: action.payload,
    };
  case 'CHECK_ALL':
    return {
      ...state,
      checkList: action.payload.target.checked ? state.plainOptions : [],
    };
  case 'SORT_TOGGLE':
    return {
      ...state,
      isCheapest: !state.isCheapest,
    };
  case 'SET_TICKET_ARRAY':
    return {
      ...state,
      tickets: [...state.tickets, ...action.payload.tickets],
    };
  case 'LOADING_START':
    return {
      ...state,
      isLoading: true,
    };
  case 'LOADING_END':
    return {
      ...state,
      isLoading: false,
    };
  case 'ERROR_CATCH':
    return {
      ...state,
      isError: true,
    };

  default:
    return state;
  }
};

export default reducer;

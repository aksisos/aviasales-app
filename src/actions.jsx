export const check = (payload) => ({ type: 'CHECK', payload });

export const checkAll = (payload) => ({type: 'CHECK_ALL', payload});

export const sortToggle = () => ({type: 'SORT_TOGGLE'});

export const startLoading = () => ({ type: 'START_LOADING' });

export const setTicketArray = (payload) => ({type: 'SET_TICKET_ARRAY', payload});

export const loadingStart = () => ({type: 'LOADING_START'});

export const loadingEnd = () => ({type: 'LOADING_END'});

export const errorCatch = () => ({type: 'ERROR_CATCH'});


export const fetchOtherTickets = async (dispatch, id) => {
  dispatch(loadingStart());
  await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(setTicketArray(res));
      return res;
    }
    )
    .then((res) => {
        
      if (!res.stop) {
        fetchOtherTickets(dispatch, id);
      }
      if (res.stop) {
        dispatch(loadingEnd());
      }
    }).catch(() => {
      dispatch(loadingEnd());
      dispatch(errorCatch());
    });
};

export const fetchTickets = () => async (dispatch) => {
  await fetch('https://aviasales-test-api.kata.academy/search')
    .then((res) => res.json())
    .then(async (res) => {
      await fetchOtherTickets(dispatch, res.searchId);
    });
};
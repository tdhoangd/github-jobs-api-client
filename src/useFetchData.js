import {useReducer, useEffect, useState} from 'react';
import axios from 'axios';

const JOB_ACTIONS = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  HAS_NEXT_PAGE: 'HAS_NEXT_PAGE'
}

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case JOB_ACTIONS.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case JOB_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    case JOB_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case JOB_ACTIONS.HAS_NEXT_PAGE:
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage
      };
    default:
      throw new Error();
  }
};

export default function useFetchData() {
  const URL = '/positions.json?';
  const [params, setParams] = useState({page: 1});
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    hasNextPage: false,
    data: []
  });

  useEffect(() => {

    const cancel1 = axios.CancelToken.source();
    dispatch({type: JOB_ACTIONS.FETCH_INIT});
    axios.get(URL, {
      cancelToken: cancel1.token,
      params: params
    } )
    .then(response => {
      dispatch({type: JOB_ACTIONS.FETCH_SUCCESS, payload: {data: response.data}});
    }).catch(err => {
      if (axios.isCancel(err)) return;
      dispatch({type: JOB_ACTIONS.FETCH_ERROR });
    });

    const cancel2 = axios.CancelToken.source();
    let t = {
      ...params,
      page: params.page+1
    };
    axios.get(URL, {
      cancelToken: cancel2.token,
      params: t
    })
    .then(response => {
      dispatch({type: JOB_ACTIONS.HAS_NEXT_PAGE, payload: {hasNextPage: response.data.length !== 0}});
    }).catch(err => {
      if (axios.isCancel(err)) return;
      dispatch({type: JOB_ACTIONS.FETCH_ERROR });
    });

    return () => {
      cancel1.cancel()
      cancel2.cancel()
    };
  }, [params]);

  return {state, params, setParams};
};


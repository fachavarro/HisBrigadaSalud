import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IServidorAPI, defaultValue } from 'app/shared/model/servidor-api.model';

export const ACTION_TYPES = {
  FETCH_SERVIDORAPI_LIST: 'servidorAPI/FETCH_SERVIDORAPI_LIST',
  FETCH_SERVIDORAPI: 'servidorAPI/FETCH_SERVIDORAPI',
  CREATE_SERVIDORAPI: 'servidorAPI/CREATE_SERVIDORAPI',
  UPDATE_SERVIDORAPI: 'servidorAPI/UPDATE_SERVIDORAPI',
  DELETE_SERVIDORAPI: 'servidorAPI/DELETE_SERVIDORAPI',
  RESET: 'servidorAPI/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IServidorAPI>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ServidorAPIState = Readonly<typeof initialState>;

// Reducer

export default (state: ServidorAPIState = initialState, action): ServidorAPIState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SERVIDORAPI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SERVIDORAPI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SERVIDORAPI):
    case REQUEST(ACTION_TYPES.UPDATE_SERVIDORAPI):
    case REQUEST(ACTION_TYPES.DELETE_SERVIDORAPI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SERVIDORAPI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SERVIDORAPI):
    case FAILURE(ACTION_TYPES.CREATE_SERVIDORAPI):
    case FAILURE(ACTION_TYPES.UPDATE_SERVIDORAPI):
    case FAILURE(ACTION_TYPES.DELETE_SERVIDORAPI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERVIDORAPI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERVIDORAPI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SERVIDORAPI):
    case SUCCESS(ACTION_TYPES.UPDATE_SERVIDORAPI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SERVIDORAPI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/servidor-apis';

// Actions

export const getEntities: ICrudGetAllAction<IServidorAPI> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SERVIDORAPI_LIST,
  payload: axios.get<IServidorAPI>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IServidorAPI> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SERVIDORAPI,
    payload: axios.get<IServidorAPI>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IServidorAPI> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SERVIDORAPI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IServidorAPI> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SERVIDORAPI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IServidorAPI> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SERVIDORAPI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

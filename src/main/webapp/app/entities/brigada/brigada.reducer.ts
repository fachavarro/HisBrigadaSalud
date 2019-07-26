import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBrigada, defaultValue } from 'app/shared/model/brigada.model';

export const ACTION_TYPES = {
  FETCH_BRIGADA_LIST: 'brigada/FETCH_BRIGADA_LIST',
  FETCH_BRIGADA: 'brigada/FETCH_BRIGADA',
  CREATE_BRIGADA: 'brigada/CREATE_BRIGADA',
  UPDATE_BRIGADA: 'brigada/UPDATE_BRIGADA',
  DELETE_BRIGADA: 'brigada/DELETE_BRIGADA',
  RESET: 'brigada/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBrigada>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BrigadaState = Readonly<typeof initialState>;

// Reducer

export default (state: BrigadaState = initialState, action): BrigadaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BRIGADA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BRIGADA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BRIGADA):
    case REQUEST(ACTION_TYPES.UPDATE_BRIGADA):
    case REQUEST(ACTION_TYPES.DELETE_BRIGADA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BRIGADA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BRIGADA):
    case FAILURE(ACTION_TYPES.CREATE_BRIGADA):
    case FAILURE(ACTION_TYPES.UPDATE_BRIGADA):
    case FAILURE(ACTION_TYPES.DELETE_BRIGADA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BRIGADA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BRIGADA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BRIGADA):
    case SUCCESS(ACTION_TYPES.UPDATE_BRIGADA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BRIGADA):
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

const apiUrl = 'api/brigadas';

// Actions

export const getEntities: ICrudGetAllAction<IBrigada> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BRIGADA_LIST,
  payload: axios.get<IBrigada>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IBrigada> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BRIGADA,
    payload: axios.get<IBrigada>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBrigada> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BRIGADA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBrigada> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BRIGADA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBrigada> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BRIGADA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

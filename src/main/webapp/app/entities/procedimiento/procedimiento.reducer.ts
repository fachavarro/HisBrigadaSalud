import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProcedimiento, defaultValue } from 'app/shared/model/procedimiento.model';

export const ACTION_TYPES = {
  FETCH_PROCEDIMIENTO_LIST: 'procedimiento/FETCH_PROCEDIMIENTO_LIST',
  FETCH_PROCEDIMIENTO: 'procedimiento/FETCH_PROCEDIMIENTO',
  CREATE_PROCEDIMIENTO: 'procedimiento/CREATE_PROCEDIMIENTO',
  UPDATE_PROCEDIMIENTO: 'procedimiento/UPDATE_PROCEDIMIENTO',
  DELETE_PROCEDIMIENTO: 'procedimiento/DELETE_PROCEDIMIENTO',
  RESET: 'procedimiento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProcedimiento>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProcedimientoState = Readonly<typeof initialState>;

// Reducer

export default (state: ProcedimientoState = initialState, action): ProcedimientoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROCEDIMIENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROCEDIMIENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROCEDIMIENTO):
    case REQUEST(ACTION_TYPES.UPDATE_PROCEDIMIENTO):
    case REQUEST(ACTION_TYPES.DELETE_PROCEDIMIENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROCEDIMIENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROCEDIMIENTO):
    case FAILURE(ACTION_TYPES.CREATE_PROCEDIMIENTO):
    case FAILURE(ACTION_TYPES.UPDATE_PROCEDIMIENTO):
    case FAILURE(ACTION_TYPES.DELETE_PROCEDIMIENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROCEDIMIENTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROCEDIMIENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROCEDIMIENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_PROCEDIMIENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROCEDIMIENTO):
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

const apiUrl = 'api/procedimientos';

// Actions

export const getEntities: ICrudGetAllAction<IProcedimiento> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROCEDIMIENTO_LIST,
  payload: axios.get<IProcedimiento>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProcedimiento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROCEDIMIENTO,
    payload: axios.get<IProcedimiento>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProcedimiento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROCEDIMIENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProcedimiento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROCEDIMIENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProcedimiento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROCEDIMIENTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

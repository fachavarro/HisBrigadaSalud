import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtencion, defaultValue } from 'app/shared/model/atencion.model';

export const ACTION_TYPES = {
  FETCH_ATENCION_LIST: 'atencion/FETCH_ATENCION_LIST',
  FETCH_ATENCION: 'atencion/FETCH_ATENCION',
  CREATE_ATENCION: 'atencion/CREATE_ATENCION',
  UPDATE_ATENCION: 'atencion/UPDATE_ATENCION',
  DELETE_ATENCION: 'atencion/DELETE_ATENCION',
  RESET: 'atencion/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtencion>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AtencionState = Readonly<typeof initialState>;

// Reducer

export default (state: AtencionState = initialState, action): AtencionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENCION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENCION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENCION):
    case REQUEST(ACTION_TYPES.UPDATE_ATENCION):
    case REQUEST(ACTION_TYPES.DELETE_ATENCION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENCION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENCION):
    case FAILURE(ACTION_TYPES.CREATE_ATENCION):
    case FAILURE(ACTION_TYPES.UPDATE_ATENCION):
    case FAILURE(ACTION_TYPES.DELETE_ATENCION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENCION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENCION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENCION):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENCION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENCION):
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

const apiUrl = 'api/atencions';

// Actions

export const getEntities: ICrudGetAllAction<IAtencion> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ATENCION_LIST,
  payload: axios.get<IAtencion>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAtencion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENCION,
    payload: axios.get<IAtencion>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAtencion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENCION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtencion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENCION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtencion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENCION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

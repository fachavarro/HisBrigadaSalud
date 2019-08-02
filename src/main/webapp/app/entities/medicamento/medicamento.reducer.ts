import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMedicamento, defaultValue } from 'app/shared/model/medicamento.model';

export const ACTION_TYPES = {
  FETCH_MEDICAMENTO_LIST: 'medicamento/FETCH_MEDICAMENTO_LIST',
  FETCH_MEDICAMENTO: 'medicamento/FETCH_MEDICAMENTO',
  CREATE_MEDICAMENTO: 'medicamento/CREATE_MEDICAMENTO',
  UPDATE_MEDICAMENTO: 'medicamento/UPDATE_MEDICAMENTO',
  DELETE_MEDICAMENTO: 'medicamento/DELETE_MEDICAMENTO',
  RESET: 'medicamento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMedicamento>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MedicamentoState = Readonly<typeof initialState>;

// Reducer

export default (state: MedicamentoState = initialState, action): MedicamentoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEDICAMENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEDICAMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MEDICAMENTO):
    case REQUEST(ACTION_TYPES.UPDATE_MEDICAMENTO):
    case REQUEST(ACTION_TYPES.DELETE_MEDICAMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MEDICAMENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEDICAMENTO):
    case FAILURE(ACTION_TYPES.CREATE_MEDICAMENTO):
    case FAILURE(ACTION_TYPES.UPDATE_MEDICAMENTO):
    case FAILURE(ACTION_TYPES.DELETE_MEDICAMENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEDICAMENTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEDICAMENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEDICAMENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_MEDICAMENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEDICAMENTO):
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

const apiUrl = 'api/medicamentos';

// Actions

export const getEntities: ICrudGetAllAction<IMedicamento> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEDICAMENTO_LIST,
  payload: axios.get<IMedicamento>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMedicamento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEDICAMENTO,
    payload: axios.get<IMedicamento>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMedicamento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEDICAMENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMedicamento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEDICAMENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMedicamento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEDICAMENTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

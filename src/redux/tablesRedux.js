import shortid from 'shortid';
import initialState from './initialState';

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const ADD_TABLE = createActionName('ADD_TABLE');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

//selectors
export const getAllTables = (state) => state.tables;

export const getTableById = (state, tableId) => state.tables.find((table) => table.id === tableId);

export const updateTable = (payload) => ({
  type: UPDATE_TABLE,
  payload,
});
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then((res) => res.json())
      .then((tables) => dispatch({ type: FETCH_TABLES, payload: tables }));
  };
};

export const updateTableRequest = (table) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(table),
    };

    fetch(`http://localhost:3131/api/tables/${table.id}`, options).then(() => dispatch(updateTable(table)));
  };
};

// action creators
export const tablesReducer = (statePart = initialState.tables, action) => {
  switch (action.type) {
    case FETCH_TABLES:
      return action.payload;
    case ADD_TABLE:
      return [...statePart, { ...action.payload, id: shortid() }];
    case UPDATE_TABLE:
      return statePart.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    default:
      return statePart;
  }
};

export const FETCH_TABLES = 'app/tables/FETCH_TABLES';

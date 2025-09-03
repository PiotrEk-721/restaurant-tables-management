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


// action creators
const tablesReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case ADD_TABLE:
      return [...statePart, { ...action.payload, id: shortid() }];
    case UPDATE_TABLE:
      return statePart.map((table) => table.id === action.payload.id ? { ...table, ...action.payload } : table);
    default:
      return statePart;
  }
};

export default tablesReducer;

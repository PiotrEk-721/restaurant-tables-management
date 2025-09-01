//selectors
export const getAllTables = (state) => state.tables;

export const getTableById = ({ tables }, tableId) => tables.find((table) => table.id === tableId);

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;

// action creators
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  }
};
export default tablesReducer;

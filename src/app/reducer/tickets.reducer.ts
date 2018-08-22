const initialState = {
  tickets: [],
  categories: [],
  settings: []
};

function remove(array: any[], elements: any[]) {
  let resultArray = array;
  elements.forEach(el => {
    resultArray = resultArray.filter(arritem => el !== arritem._id);
  });
  return resultArray;
}

function replace(array: any[], elements: any[]) {
  array.forEach(arrEl => {
    arrEl = elements.filter(el => el._id === arrEl._id).length ? elements.filter(el => el._id === arrEl._id)[0] : arrEl;
  });
}

export function ticketReducer(state = initialState, action ) {
  switch (action.type) {
    case 'ADD_TICKET':
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    case 'UPDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map(ticket => {
          if (ticket._id === action.payload._id) {
            return action.payload;
          } else {
            return ticket;
          }
        }),
      };
    case 'DELETE_TICKET':
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket._id !== action.payload),
      };
    case 'GET_TICKETS':
      return {
        ...state,
        tickets: action.payload,
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    case 'DELETE_CATEGORIES':
      return {
        ...state,
        categories: remove(state.categories, action.payload),
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category._id === action.payload._id) {
            return action.payload;
          } else {
            return category;
          }
        }),
      };
    case 'GET_SETTINGS':
      return {
        ...state,
        settings: action.payload,
      };
    case 'ADD_SETTING':
      return {
        ...state,
        settings: [...state.settings, action.payload],
      };
    case 'DELETE_SETTING':
      return {
        ...state,
        settings: state.settings.filter(stng => stng._id !== action.payload._id),
      };
    case 'UPDATE_SETTING':
      return {
        ...state,
        settings: state.settings.map(stng => {
          if (stng._id === action.payload._id) {
            return action.payload;
          } else {
            return stng;
          }
        }),
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: replace(state.settings, action.payload)
      };
    default:
      return state;
  }
}

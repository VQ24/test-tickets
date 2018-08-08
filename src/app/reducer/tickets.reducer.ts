import { Action } from '@ngrx/store';

const initialState = {
  tickets: [],
  categories: [],
};

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
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
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
    default:
      return state;
  }
}

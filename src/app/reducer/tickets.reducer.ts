import { Action } from '@ngrx/store';

const initialState = {
  tickets: []
};

export function ticketReducer(state = initialState, action ) {
  switch (action.type) {
    case 'ADD_TICKET':
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
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
    default:
      return state;
  }
}

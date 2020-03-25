import { userConstants } from '../_constants';

export function contacts(state = {}, action) {
  switch (action.type) {
    case userConstants.USER_CONTACTS_REQUEST:
    return {
        ...state,
        loading: true
      };
    case userConstants.USER_CONTACTS_SUCCESS:
      return {
        items: action.contacts
      };
    case userConstants.USER_CONTACTS_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter(item=> item.id !== action.id)
      };
    case userConstants.ADD_CONTACT_REQUEST:
      return state;
    case userConstants.ADD_CONTACT_SUCCESS:
      const lastItemId = state.items.length ? state.items[state.items.length - 1 ].id : 0;
      state.items.push({name: action.contact.name, phone: action.contact.name, userId: action.contact.userId, id: lastItemId + 1 });
      return {...state};
    case userConstants.ADD_CONTACT_FAILURE:
      return state;
    case userConstants.UPDATE_CONTACT_REQUEST:
      return state;
    case userConstants.UPDATE_CONTACT_REQUEST_SUCCESS:
      state.items.map(contact => {
        if (contact.id === action.contacts.id) {
          contact.name = action.contacts.name
        }
        return contact;
      })
      return {...state};
    case userConstants.UPDATE_CONTACT_REQUEST_FAILURE:
      return state;
            
    default:
      return state
  }
}
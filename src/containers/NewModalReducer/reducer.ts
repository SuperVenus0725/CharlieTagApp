import Types from "./types";

const initialState: any = {
  newRuleModal: false,
  editModal: false,
  id: null,
};

export default function dummyreducer(state = initialState, action: any): any {
  switch (action.type) {
    case Types.OPEN_NEW_RULE:
      return {
        ...state,
        newRuleModal: action.payload.newRuleModal,
        editModal: action.payload.editModal,
        id: action.payload.id,
      };
    case Types.DATA_LOADED:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

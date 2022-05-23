import Types from "./types";

const initialState: any = {
  selectState: false,
};

export default function dummyreducer(state = initialState, action: any): any {
  switch (action.type) {
    case Types.ADD_TAG_REQUEST:
      return { ...state, selectState: action.payload };
    case Types.DELETE_TAG_REQUEST:
      return { ...state, selectState: action.payload };
    default:
      return state;
  }
}

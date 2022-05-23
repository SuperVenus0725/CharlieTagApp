import Types from "./types";

const initialState: any = {
  SelectedColumn: [],
};

export default function dummyreducer(state = initialState, action: any): any {
  switch (action.type) {
    case Types.SELECT_COLUMN_REQUEST:
      return { ...state, reloadState: action.payload };
    default:
      return state;
  }
}

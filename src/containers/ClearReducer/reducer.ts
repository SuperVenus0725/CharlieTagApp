import Types from "./types";

const initialState: any = {
  filterState: true,
};

export default function deviceSelectReducer(
  state = initialState,
  action: any
): any {
  switch (action.type) {
    case Types.CLEAR_FILTER_REQUEST:
      return { ...state, filterState: action.payload };
    default:
      return state;
  }
}

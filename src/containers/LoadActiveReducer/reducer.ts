import Types from "./types";

const initialState: any = {
  loadState: false,
};

export default function dummyreducer(state = initialState, action: any): any {
  switch (action.type) {
    case Types.LOAD_FILTER_ACTIVE:
      return { ...state, loadState: action.payload };
    default:
      return state;
  }
}

import Types from "./types";

const initialState: any = {
  reloadState: false,
};

export default function dummyreducer(state = initialState, action: any): any {
  switch (action.type) {
    case Types.RELOAD_REQUEST:
      return { ...state, reloadState: action.payload };
    default:
      return state;
  }
}

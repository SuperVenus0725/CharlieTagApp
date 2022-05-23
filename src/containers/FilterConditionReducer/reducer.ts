import Types from "./types";

const initialState: any = {
  filterCondition: [],
};

export default function dummyreducer(state = initialState, action: any): any {
  switch (action.type) {
    case Types.FILTER_CONDITION_REQUEST:
      return { ...state, filterCondition: action.payload.filterCondition };
    default:
      return state;
  }
}

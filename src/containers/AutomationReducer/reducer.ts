import Types from "./types";

const initialState: any = {
  automationState: {
    guid: null,
    id: null,
    frequency: null,
    state: 0,
    filterCondition: [],
    auto_id: 0,
  },
};

export default function deviceSelectReducer(
  state = initialState,
  action: any
): any {
  switch (action.type) {
    case Types.AUTOMATIOIN_CREATE:
      return { ...state, automationState: action.payload };
    default:
      return state;
  }
}

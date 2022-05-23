import Types from "./types";
import { ORIGINAL_DEVICE_SELECT_ID } from "../../utils/config";

const initialState: any = {
  deviceId: ORIGINAL_DEVICE_SELECT_ID,
};

export default function deviceSelectReducer(
  state = initialState,
  action: any
): any {
  switch (action.type) {
    case Types.CHANGE_SELECT_DEVICE:
      return { ...state, deviceId: action.payload };
    default:
      return state;
  }
}

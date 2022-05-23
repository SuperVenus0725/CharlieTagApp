import { combineReducers } from "redux";

//import dummyReducer from './containers/Dummy/reducer';
import newModalReducer from "./containers/NewModalReducer/reducer";
import reloadModalReducer from "./containers/ReloadModalReducer/reducer";
import selectColumnReducer from "./containers/SelectColumn/reducer";
import tablePaginationReducer from "./containers/TablePaginationReducer/reducer";
import deviceSelectReducer from "./containers/DeviceSelectReducer/reducer";
import FilterConditionReducer from "./containers/FilterConditionReducer/reducer";
import LoadActiveReducer from "./containers/LoadActiveReducer/reducer";
import AutomationStateReducer from "./containers/AutomationReducer/reducer";
import SelectBoxReducer from "./containers/SelectBoxReducer/reducer";
import FilterStateReducer from "./containers/ClearReducer/reducer";

const rootReducer = combineReducers({
  // dummy: dummyReducer,
  newModal: newModalReducer,
  reload: reloadModalReducer,
  selectColumn: selectColumnReducer,
  tablePagination: tablePaginationReducer,
  deviceSelectId: deviceSelectReducer,
  filterCondition: FilterConditionReducer,
  loadActiveState: LoadActiveReducer,
  automationState: AutomationStateReducer,
  selectState: SelectBoxReducer,
  filterState: FilterStateReducer,
});

export default rootReducer;

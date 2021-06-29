import { combineReducers } from "redux";
import { reducer as formatReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";

import DashboardReducer from "../dashboard/dashboardReducer";
import TabReducer from "../common/tab/tabReducer";
import BillingCycleReducer from "../billingCycle/billingReducer";
import AuthReducer from "../auth/authReducer";

const rootReducer = combineReducers({
  dashboard: DashboardReducer,
  tab: TabReducer,
  billingCycle: BillingCycleReducer,
  form: formatReducer,
  toastr: toastrReducer,
  auth: AuthReducer,
});

export default rootReducer;

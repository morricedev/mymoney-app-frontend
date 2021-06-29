import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset as resetForm, initialize } from "redux-form";
import { selectTab, showTabs } from "../common/tab/tabActions";

const BASE_URL = "http://localhost:3003/api";
const INITIAL_VALUES = { credits: [{}], debts: [{}] };

export function getList() {
  const request = axios.get(`${BASE_URL}/billingCycles`, {
    params: {
      sort: { year: -1, month: 1 },
    },
  });

  return {
    type: "BILLING_CYCLES_FETCHED",
    payload: request,
  };
}

export function createBilling(values) {
  return submit(values, "post");
}

export function updateBilling(values) {
  return submit(values, "put");
}

export function deleteBilling(values) {
  return submit(values, "delete");
}

function submit(values, method) {
  return (dispatch) => {
    const id = values._id ? values._id : "";
    axios[method](`${BASE_URL}/billingCycles/${id}`, values)
      .then((_) => {
        toastr.success("Sucesso", "Operação realizada com sucesso!");
        dispatch(init());
      })
      .catch((err) => {
        err.response.data.errors.forEach((error) =>
          toastr.error("Error", error)
        );
      });
  };
}

export function showUpdate(billingCycle) {
  return [
    showTabs("tabUpdate"),
    selectTab("tabUpdate"),
    initialize("billingCycleForm", billingCycle),
  ];
}

export function showDelete(billingCycle) {
  return [
    showTabs("tabDelete"),
    selectTab("tabDelete"),
    initialize("billingCycleForm", billingCycle),
  ];
}

export function init() {
  return [
    showTabs("tabList", "tabCreate"),
    selectTab("tabList"),
    getList(),
    initialize("billingCycleForm", INITIAL_VALUES),
  ];
}

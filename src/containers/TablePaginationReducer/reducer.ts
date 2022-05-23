import Types from "./types";

let crrPage = localStorage.getItem("currentPage");
let crrPageSize = localStorage.getItem("currentPageSize");

const initialState: any = {
  tablePaginationState: {
    current: crrPage ? Number(crrPage) : 1,
    pageSize: crrPageSize ? Number(crrPageSize) : 10,
  },
};

export default function dummyreducer(state = initialState, action: any): any {
  switch (action.type) {
    case Types.TABLE_PAGINATION_CHANGE:
      return { ...state, tablePaginationState: action.payload };
    default:
      return state;
  }
}

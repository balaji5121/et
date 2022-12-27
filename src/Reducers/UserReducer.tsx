import { TransactionObj } from "../Pages/AddTransaction";

export interface UserObj {
  key: string;
  value: any;
}
export type Actions =
  | { type: "FETCH_SUCESS"; payload: { key: string; value: any } }
  | { type: "FETCH_FAILURE"; payload: { key: string; value: any } };

export const initialState = {
  key: "",
  value: {},
};

export const UserReducer = (state: UserObj, action: Actions) => {
  switch (action.type) {
    case "FETCH_SUCESS":
      return { ...state, key: action.payload.key, value: action.payload.value };
    case "FETCH_FAILURE":
      return { ...state, key: action.payload.key, value: action.payload.value };
    default:
      return state;
  }
};
export interface TObj {
  transactionsList: TransactionObj[];
}

type TActions = { type: "ADD_ITEM"; payload: { data: TransactionObj } };

export const TansactionState = {
  transactionsList: [],
};

export const TReducer = (state: TObj, action: TActions) => {
  switch (action.type) {
    case "ADD_ITEM":
      console.log(action.payload.data);

      return {
        ...state,
        transactionsList: [...state.transactionsList, action.payload.data],
      };
    default:
      return state;
  }
};

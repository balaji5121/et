import React, { createContext, Provider, useReducer } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./App.css";
import Home from "./Pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";
import AddTransaction from "./Pages/AddTransaction";
import {
  initialState,
  TansactionState,
  TReducer,
  UserReducer,
} from "./Reducers/UserReducer";

export const UserDataContext = createContext({});

const App: React.FC = () => {
  const [userDataInfo, dispatch] = useReducer(UserReducer, initialState);
  const [listDataInfo, listDispatch] = useReducer(TReducer, TansactionState);

  return (
    <UserDataContext.Provider
      value={{ userDataInfo, dispatch, listDataInfo, listDispatch }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Layout>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/add/transaction"
            component={AddTransaction}
          />
        </Layout>
      </Switch>
    </UserDataContext.Provider>
  );
};

export default App;

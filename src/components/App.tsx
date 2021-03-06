import * as React from "react";

/**
 * Dependencies
 */
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { useAppDispatch } from "context/app.context";
import * as AppActions from "../context/app.actions";

/**
 * Components
 */
import Login from "./routes/Login";
import Me from "./routes/Me";
import PageNotFound from "./routes/PageNotFound";
import NewsArticle from "./routes/NewsArticle";
import Modal from "./layout/Modal";
import Profile from "./routes/Profile/Profile";
import Settings from "./routes/Settings/Settings";
import AccountSettings from "./routes/Settings/AccountSettings";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(AppActions.fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <Modal />
      <Switch>
        <Redirect exact path="/" to="/me" />

        <Route exact path="/me" component={Me} />
        <Route path="/community/news/:id" component={NewsArticle} />
        <Route path="/login" component={Login} />
        <Route path="/profile/:user" component={Profile} />

        <Route path="/settings" exact component={Settings} />
        <Route path="/settings/account" component={AccountSettings} />

        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
};

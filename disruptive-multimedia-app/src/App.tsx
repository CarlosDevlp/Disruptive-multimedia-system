import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useLocation } from 'react-router-dom';
import  Menu  from './components/Menu/Menu';
import Page from './pages/Page';
import HomePage from './pages/Home/Home';
import CategoriesPage from './pages/Categories/Categories';
import LoginPage from './pages/Login/LogIn';
import SignUpPage from './pages/SignUp/SignUp';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { getToken, getUser } from './shared/services/auth.service';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from './shared/slices/user.slice';

setupIonicReact();

const App: React.FC = () => {
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const checkToken = ()=>{
    console.log('checking token...');
    const result=getToken();
    if(result){
      setToken(result);
      const user=getUser();
      if(user){
        dispatch(setUser(user));
      }
    }
    
  }

  useEffect(()=>{
    checkToken();
  }, []);

  if(!token) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="secondary">
              
              <Route path="*" exact={true}>
                <LoginPage />
              </Route>
              <Route path="/login" exact={true}>
                <LoginPage />
              </Route>
              <Route path="/signup" exact={true}>
                <SignUpPage />
              </Route>
              
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    )
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact={true}>
              <HomePage />
            </Route>
            <Route path="/categories/:categoryId" exact={true}>
              <CategoriesPage />
            </Route>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/signup" exact={true}>
              <SignUpPage />
            </Route>
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

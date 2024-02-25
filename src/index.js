import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from './store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastProvider } from 'react-toast-notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
    <ToastProvider autoDismiss={true} autoDismissTimeout="4000" placement = "bottom-right">
      <App id="app" />
      </ToastProvider>
    </Provider>
    </BrowserRouter>
  
);
reportWebVitals();

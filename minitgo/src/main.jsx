import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import { BrowserRouter  } from 'react-router-dom';
import { Provider } from 'react-redux';
 import store,{ persistor }  from './components/redux/Store.js'
// import { store, persistor } from './components/redux/Store';
 import { PersistGate } from 'redux-persist/integration/react';
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      {/* <App/> */}
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)

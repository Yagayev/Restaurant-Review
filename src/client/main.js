import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index';
import Login from './components/Login/index';
import Menu from './components/Menu/index';
import SearchEngine from './components/SearchEngine/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import Sagas from './sagas';
//import theme - change nova-light to other theme as needed
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchEngineSaga from "./components/SearchEngine/saga";



//running: npm run dev
//create saga middleware
const sagaMiddleware = createSagaMiddleware();

//create store, add reducers, attach saga
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

//run saga(s)
sagaMiddleware.run(Sagas);

// Render the main component into the dom

ReactDOM.render(
  <Provider store={store}>

      <div>
          <Menu />
          <SearchEngine />
      </div>

  </Provider>,
  document.getElementById('app'));



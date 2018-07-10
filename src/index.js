import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
// import 'semantic-ui-css/semantic.min.css';

import { routes } from './config/routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import candoneReducer, { initialState } from './redux/reducers';
import rootSaga from './sagas/actions';

{
  /*
  const store = createStore(
    directorReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
  */
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    candoneReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),),
  );

  // run saga middleware
  sagaMiddleware.run(rootSaga);

  render(
    <Provider store={store} >
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}


registerServiceWorker();

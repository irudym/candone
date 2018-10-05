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

  let store = null;
  // Only chrome can handle the redux dev tool
  // redux compose cannot handle a null or undefined middleware
  if (window.navigator.userAgent.includes('Chrome')) {
    store = createStore(
      candoneReducer,
      initialState,
      compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
    );
  } else {
    store = createStore(
      candoneReducer,
      initialState,
      compose(applyMiddleware(sagaMiddleware)),
    );
  }

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

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import commonReducer from './commonReducer'
import sessionReducer from './sessionReducer'
import rootSaga from '../sagas'

const REDUX_PERSIST_VERSION = 1

const persistConfig = {
  blacklist: ['session'],
  key: 'root',
  storage,
  version: REDUX_PERSIST_VERSION
}

const createMiddlewares = sagaMiddleware => {
  const middlewares = []
  if (sagaMiddleware) {
    middlewares.push(sagaMiddleware)
  }
  return applyMiddleware.apply({}, middlewares)
}

// Auto merge reducer level 2, so using persistCombineReducers
const rootReducer = () => persistCombineReducers(persistConfig, {
  common: commonReducer,
  session: sessionReducer
})

const initialState = {}

const composeEnhancers = __DEV__ // eslint-disable-line
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

const initalStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer(),
    initialState,
    composeEnhancers(createMiddlewares(sagaMiddleware))
  )

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(rootReducer())
    })
  }
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)

  return { persistor, store }
}

const { persistor, store } = initalStore()

export {
  persistor,
  store
}

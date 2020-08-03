import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer.jsx'
import middleware from '../middlewares/middlewares.jsx'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(middleware))

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
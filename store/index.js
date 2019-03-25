import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
// import { persistStore, autoRehydrate } from 'redux-persist'

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk)
    )
)

export default store

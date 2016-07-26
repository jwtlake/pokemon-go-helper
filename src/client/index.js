import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import makeStore from './store';

import App from './components/App';
import Login from './containers/Login';
import Recommendation from './containers/Recommendation';
import Pokemon from './containers/Pokemon';

// create store
const store = makeStore();

// routes
const routes = <Route path="/" component={App}>
	<Route path="/login" component={Login} />
	<Route path="/recommendation" component={Recommendation} />
	<Route path="/pokemon" component={Pokemon} />
</Route>

// render
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			{routes}	
		</Router>	
	</Provider>,
	document.getElementById('app')
);

// debugging
let unsub = store.subscribe(() => {
	console.log('State change..');	
	console.dir(store.getState());
});
//unsub(); //turn off

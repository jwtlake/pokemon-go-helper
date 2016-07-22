import * as types from '../action_creators.js';

const initialState = {};

function app(state = initialState, action) {
  switch (action.type) {
    default: // default return on unknown action type
      return state;
  }
}

export default app;

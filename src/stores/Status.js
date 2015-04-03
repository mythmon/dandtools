import {List} from 'immutable';
import {EventEmitter} from 'events';

import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

class StatusStore extends EventEmitter {
  constructor() {
    this.statuses = List();
    this.dispatchToken = AppDispatcher.register(this.handleEvent.bind(this));
  }

  getStatuses() {
    return this.statuses;
  }

  handleEvent(action) {
    switch (action.type) {
      case ActionTypes.ADD_CREATURE:
        this.statuses = this.statuses.push({
          name: action.name,
          currentHP: action.currentHP || action.maxHP,
          maxHP: action.maxHP,
        });
        this.emit('change');
        break;
    }
  }
}


export default new StatusStore();

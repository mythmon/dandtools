import React from 'react';
import {Dispatcher} from 'flux';

import * as dice from './dice';
import {getId} from './utils';

import AddCreature from './components/AddCreature.js';
import DiceRoller from './components/DiceRoller';
import StatusTracker from './components/StatusTracker.js';


const AppDispatcher = new Dispatcher();


class Main extends React.Component {
  render() {
    return (
      <div className="Container">
        <Selector/>
      </div>
    );
  }
}


class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [],
    };
  }

  addComponent(componentName) {
    let {components} = this.state;
    let id = `component-${componentName}-${getId()}`;
    components.push([id, componentName]);
    this.setState({components});
  }

  removeComponent(idToRemove) {
    let {components} = this.state;
    components = components.filter(([id, c]) => id !== idToRemove);
    this.setState({components});
  }

  makeAdder(name) {
    return (
      <button key={`adder-${name}`} onClick={this.addComponent.bind(this, name)}>
        {name}
      </button>
    );
  }

  render() {
    return (
      <div className="Selector">
        <div className="Selector__choices">
          Add component:
          {this.makeAdder('DiceRoller')}
          {this.makeAdder('AddCreature')}
          {this.makeAdder('StatusTracker')}
        </div>

        <div className="Selector__active">
          {this.state.components.map(([id, componentName]) => {
            var Component;
            if (componentName === 'DiceRoller') {
              Component = DiceRoller;
            } else if (componentName === 'AddCreature') {
              Component = AddCreature;
            } else if (componentName === 'StatusTracker') {
              Component = StatusTracker;
            } else {
              throw `Unknown component ${componentName}`;
            }
            return <Component key={id} remove={this.removeComponent.bind(this, id)}/>;
          })}
        </div>
      </div>
    );
  }
}


React.render(<Main/>, document.body);

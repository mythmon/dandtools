import React from 'react';
import {Dispatcher} from 'flux';

import * as dice from './dice';
import {getId} from './utils';
import AddCreature from './components/AddCreature.js';
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
            if (componentName === 'DiceRoller') {
              return <DiceRoller key={id} remove={this.removeComponent.bind(this, id)}/>;
            } else if (componentName === 'AddCreature') {
              return <AddCreature key={id} remove={this.removeComponent.bind(this, id)}/>;
            } else if (componentName === 'StatusTracker') {
              return <StatusTracker key={id} remove={this.removeComponent.bind(this, id)}/>;
            } else {
              throw `Unknown component ${componentName}`;
            }
          })}
        </div>
      </div>
    );
  }
}


class DiceRoller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceSpec: '1d6+1',
      results: [],
    };
  }

  handleTyping(ev) {
    this.setState({
      diceSpec: ev.target.value,
    });
  }

  roll() {
    let {results} = this.state;
    let roll = dice.roll(this.state.diceSpec);
    results = [roll].concat(results).slice(0, 10);
    this.setState({results});
  }

  render() {
    var valid = dice.isValid(this.state.diceSpec);
    return (
      <div className="Section DiceRoller">
        <div className="Section__title">
          Dice Roller
          <button className="Section__close small" onClick={() => this.props.remove(this)}>X</button>
        </div>
        <div className="Section__body">
          <div className="row">
            <input className="DiceRoller__input" type="text" value={this.state.diceSpec} onChange={this.handleTyping.bind(this)}/>
            <button onClick={this.roll.bind(this)} disabled={!valid}>Roll</button>
          </div>
          <div className="row">
            <span className="DiceRoller__output">
              Results: {this.state.results.join(', ')}
            </span>
          </div>
        </div>
      </div>
    );
  }
}


React.render(<Main/>, document.body);

import React from 'react';
import * as dice from './dice';


class Main extends React.Component {
  render() {
    return (
      <div className="Container">
        <DiceRoller/>
        <DiceRoller/>
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
      <section className="DiceRoller">
        <div className="row">
          <input className="DiceRoller__input" type="text" value={this.state.diceSpec} onChange={this.handleTyping.bind(this)}/>
          <button onClick={this.roll.bind(this)} disabled={!valid}>Roll</button>
        </div>
        <div className="row">
          <span className="DiceRoller__output">
            Results: {this.state.results.join(', ')}
          </span>
        </div>
      </section>
    );
  }
}

React.render(<Main/>, document.body);

import React from 'react';
import * as dice from './dice';


class Main extends React.Component {
  render() {
    return (
      <div className="Container">
        <DiceRoller/>
      </div>
    );
  }
}

class DiceRoller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dieSpec: '1d6+1',
      output: '',
    };
  }

  handleTyping(ev) {
    this.setState({
      dieSpec: ev.target.value,
    });
  }

  roll() {
    this.setState({
      output: dice.roll(this.state.dieSpec),
    });
  }

  render() {
    var valid = dice.isValid(this.state.dieSpec);
    return (
      <section className="DiceRoler">
        <input type="text" value={this.state.dieSpec} onChange={this.handleTyping.bind(this)}/>
        <span className="text-center">{this.state.output}</span>
        <button className="btn" onClick={this.roll.bind(this)} disabled={!valid}>Roll</button>
      </section>
    );
  }
}

React.render(<Main/>, document.body);

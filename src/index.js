import React from 'react';
import * as dice from './dice';


class Main extends React.Component {
  render() {
    return <DiceRoller/>;
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
    return (
      <div>
        <input type="text" value={this.state.dieSpec} onChange={this.handleTyping.bind(this)}/>
        <button onClick={this.roll.bind(this)}>Roll</button>
        <span>{this.state.output}</span>
      </div>
    );
  }
}

var target = document.createElement('div');
document.body.appendChild(target);
React.render(<Main/>, target);

import React from 'react';
import * as dice from './dice';
import bs from 'react-bootstrap';


class Main extends React.Component {
  render() {
    return (
      <bs.Grid>
        <bs.Row>
          <bs.Col md={12}>
            <h3>D&D Tools</h3>
          </bs.Col>
        </bs.Row>
        <bs.Row>
          <bs.Col md={4}>
            <DiceRoller/>
          </bs.Col>
        </bs.Row>
      </bs.Grid>
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
      <bs.Panel>
        <input type="text" value={this.state.dieSpec} onChange={this.handleTyping.bind(this)}/>
        <span>{this.state.output}</span>
        <button onClick={this.roll.bind(this)} disabled={!valid}>Roll</button>
      </bs.Panel>
    );
  }
}

var target = document.createElement('div');
document.body.appendChild(target);
React.render(<Main/>, target);

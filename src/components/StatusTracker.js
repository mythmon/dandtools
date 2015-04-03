import React from 'react';

import StatusStore from '../stores/Status';


export default class StatusTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statuses: StatusStore.getStatuses(),
    };
  }

  componentDidMount() {
    StatusStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    StatusStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState({
      statuses: StatusStore.getStatuses(),
    });
  }

  render() {
    return (
      <div className="Section StatusTracker">
        <div className="Section__title">
          Status Tracker
          <button className="Section__close small" onClick={() => this.props.remove(this)}>X</button>
        </div>
        <div className="Section__body">
          <ul>
            {this.state.statuses.map((status, i) => (
              <StatusLine {...status} key={`status-${i}`}/>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}


class StatusLine extends React.Component {
  render() {
    return (
      <li>
        {this.props.name}: {this.props.currentHP} / {this.props.maxHP}
      </li>
    );
  }
}

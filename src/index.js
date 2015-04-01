import React from 'react';


function greet(target="world") {
  return `Hello, ${target}!`;
}


class Main extends React.Component {
  render() {
    return (
      <div>
        {greet("React")}
      </div>
    );
  }
}

var target = document.createElement('div');
document.body.appendChild(target);
React.render(<Main/>, target);



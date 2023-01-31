import React from 'react';

class Prob48 extends React.Component {
  state = {
    message: 'Hello World!',
  };

  onClick = () => {
    this.setState({
      message: 'Goodbye World!',
    });
  };

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <br />
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

export default Prob48;

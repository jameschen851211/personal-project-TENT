import React from "react";
import "./CountNum.css";
class CountNum extends React.Component {
  state = { count: 0 };

  handleClickAdd = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleClickReduce = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  render() {
    return (
      <div className="Guests">
        <div className="handleReduce" onClick={this.handleClickReduce}>
          -
        </div>
        <span className="Num">{this.state.count}</span>
        <div className="handleAdd" onClick={this.handleClickAdd}>
          +
        </div>
      </div>
    );
  }
}

export default CountNum;

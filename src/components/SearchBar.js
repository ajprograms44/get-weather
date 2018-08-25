import React from 'react';

export class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const updatedLocation = this.textInput.value;
    this.props.onClick(updatedLocation);
    this.textInput.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleChange}>
          <input className={this.props.errorClass} ref={(input) => {this.textInput = input; }} type='text'/>
          <button onClick={this.handleChange}>Submit</button>
        </form>
      </div>
    )
  }
}


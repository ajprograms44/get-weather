import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
    
        <p>{this.props.location}</p>
        <p>{this.props.tempF}</p>
        <p>{this.props.tempC}</p>
        <p>{this.props.feelsLikeF}</p>
        <p>{this.props.feelsLikeC}</p>
        <p>{this.props.condition}</p>
        <p>{this.props.conditionPic}</p>
        <p>{this.props.time}</p>
        <p>{this.props.lastUpdated}</p>
    
      </div>
    )
    
  }
} 

export default Weather;
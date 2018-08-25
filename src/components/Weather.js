import React from 'react';

class Weather extends React.Component {

  render() {
    let tempF = Math.floor(this.props.tempF)
    let tempC = Math.floor(this.props.tempC)
    return(
      
      <div className='info'>

          {this.props.errorText
            ? 
            <div className='errorText'>
              <p>{this.props.errorText}</p>
            </div> 
            :
            <div className='weatherInfo'>
              <p className='city'>{this.props.location}</p>

              <p className='tempF'>{tempF}</p>
              <p className='tempC'>{tempC}</p>
              <p className='condition'>{this.props.condition}</p>

              <p className='time'>{this.props.time}</p>
            </div>
         }

      </div>
    )
    
  }
} 

export default Weather;
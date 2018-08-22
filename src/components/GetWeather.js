import React,{ Component } from 'react';
import { apixuKey } from '../keys'
import Weather from './Weather'

class GetWeather extends Component {
  state = {
    location:'',
    tempF: null,
    tempC: null,
    feelsLikeF: null,
    feelsLikeC: null,
    condition: null,
    conditionPic: '',
    time: null,
    lastUpdated: null,
    lat: '',
    long: '',
    error:''
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        fetch(`http://api.apixu.com/v1/forecast.json?key=${apixuKey}&q=${latitude},${longitude}&days=7`)
        .then(res => res.json())
        .then((json) => {
          const location = json.location.name
          const tempF = json.current.temp_f
          const tempC = json.current.temp_c
          const feelsLikeF = json.current.feelslike_f
          const feelsLikeC = json.current.feelslike_c
          const condition = json.current.condition.text
          const conditionPic = json.current.condition.icon
          const time = json.location.localtime
          const lastUpdated = json.current.last_updated_epoch
          this.setState({location, tempF, tempC, feelsLikeF, feelsLikeC, 
            condition, conditionPic, time, lastUpdated})
      })
        })
    } else {
      const error = 'You do not have geolocation enabled in your broswer'
      this.setState({error})
    }
  }

  render() {
    return (
      <div>
        <Weather 
        location ={this.state.location}
        tempF = {this.state.tempF}
        tempC = {this.state.tempC}
        feelsLikeF = {this.state.feelsLikeF}
        feelsLikeC = {this.state.feelsLikeC}
        condition = {this.state.condition}
        conditionPic = {this.state.conditionPic}
        time = {this.state.time}
        lastUpdated = {this.state.lastUpdated}
        />
      </div>
    )
  }
}

export default GetWeather;
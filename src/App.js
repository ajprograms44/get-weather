import React, { Component } from 'react';
import { apixuKey } from './keys'
import Weather from './components/Weather'
import { Searchbar } from './components/SearchBar';
import './App.css';

class App extends Component {
  state = {
    updatedLocation: null,
    location: null,
    tempF: null,
    tempC: null,
    feelsLikeF: null,
    feelsLikeC: null,
    condition: null,
    conditionPic: '',
    time: null,
    lastUpdated: null,
    lat: null,
    long: null,
    error: false,
    loading: true
  }

  getWeatherUpdate = async(location) => {
    let response = await fetch(`http://api.apixu.com/v1/forecast.json?key=${apixuKey}&q=${location}&days=7`)
    let body = response.json()

    if (response.error){
      console.log(response.error.message)
    } else {
      this.setState({
        errorText:'',
        loading: false
      })
    }

    return body
  }

  getWeatherMount = async (latitude, longitude) => {
    let response = await fetch(`http://api.apixu.com/v1/forecast.json?key=${apixuKey}&q=${latitude},${longitude}&days=7`)
    let body = await response.json()
    
    if (response.error){
      console.log(response.error.message)
    }  else {
      this.setState({
        errorText:'',
        loading: false,
      })
    }

    return body;
  }


  getLocAndWeather = () => {
    const options = {
      enableHighAccuracy: true
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        this.getWeatherMount(latitude,longitude)
        .then(res => this.setState({
          location: res.location.name,
          tempF: res.current.temp_f,
          tempC: res.current.temp_c,
          feelsLikeF: res.current.feelslike_f,
          feelsLikeC: res.current.feelslike_c,
          condition: res.current.condition.text,
          conditionPic: res.current.condition.icon,
          time: res.location.localtime,
          lastUpdated: res.current.last_updated,
          lat: res.location.lat,
          long: res.location.lon,
        }))
      },(err) => alert(`ERROR(${err.code}): ${err.message}`),options)
    } else {
        const error = 'You do not have geolocation enabled in your broswer'
        this.setState({error})
          }
  }

  changeLocation = (updatedLocation) => {
    this.setState({
      location: updatedLocation
    }, () => {
      this.getWeatherUpdate(updatedLocation)
        .then(res => this.setState({
          location: res.location.name,
          tempF: res.current.temp_f,
          tempC: res.current.temp_c,
          feelsLikeF: res.current.feelslike_f,
          feelsLikeC: res.current.feelslike_c,
          condition: res.current.condition.text,
          conditionPic: res.current.condition.icon,
          time: res.location.localtime,
          lastUpdated: res.current.last_updated,
          lat: res.location.lat,
          long: res.location.lon,
        }))
        .catch(err =>
        this.setState({
          errorText: "City does not exist!",
          error: true
        }),
        console.log(this.state.errorText)
      )
    })
  }




  componentDidMount() {
    this.getLocAndWeather();
  }

  render() {
    return (
      <div>
        <Searchbar errorClass={this.state.errorClass} onSubmit={this.changeLocation} onClick={this.changeLocation}/>
       
        {this.state.loading 
        ? 
        <div className='loading'><p>Loading...</p></div> 
        :
        <Weather 
        location = {this.state.location}
        tempF = {this.state.tempF}
        tempC = {this.state.tempC}
        feelsLikeF = {this.state.feelsLikeF}
        feelsLikeC = {this.state.feelsLikeC}
        condition = {this.state.condition}
        conditionPic = {this.state.conditionPic}
        time = {this.state.time}
        lastUpdated = {this.state.lastUpdated}
        errorText = {this.state.errorText}
        /> }
        

      </div>
    )
  }
}

export default App;

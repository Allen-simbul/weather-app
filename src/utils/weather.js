const axios = require('axios')

const forecast = {
    location: '',
    temperature: null,
    probRain: null,
    error: false,
    errorMsg: ''
}

const weatherData = async (lat, long) => {
    const weatherKey = process.env.WEATHERSTACK_API_KEY
    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${lat},${long}`
    console.log('test')
    return await axios({
        method: 'get',
        url: weatherStackUrl,
        responseType: 'json'
    }).then(res => {
        console.log(res.data)
        forecast.location = res.data.location.name
        forecast.temperature = res.data.current.temperature
        forecast.probRain = res.data.current.feelslike
        forecast.error = false
        forecast.errorMsg = ''
        return forecast
    }).catch(err => {
        forecast.location = ''
        forecast.temperature = res.data.current.temperature
        forecast.probRain = res.data.current.probRain
        forecast.error = true
        forecast.errorMsg = 'No network connection'
        return forecast
    })
}

module.exports = weatherData;
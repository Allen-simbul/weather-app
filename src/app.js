const path = require('path')
const express = require('express')
const axios = require('axios')
const hbs = require('hbs');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const mapboxData = require('./utils/location')
const weatherData  = require('./utils/weather')
const geolocation = async (location) => {
    console.log('hello')
    return await mapboxData(location)
}
const forecast = async (lat, long) => {
    return await weatherData(lat, long)
}

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Allen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Allen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        message: 'Ive fallen and cant get up',
        name: 'Allen'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            title: 'Weather',
            error: 'No address provided',
            name: 'Allen'
        })
    }

    geolocation(req.query.address)
    .then(data => {
        if (data.error) {
            return res.send({
                error: data.errorMsg
            })
        }
        forecast(data.lat, data.long)
        .then(weatherData => {
            return res.send({
                location: weatherData.location,
                temperature: weatherData.temperature,
                probRain: weatherData.probRain,
                error: weatherData.error,
                errorMsg: weatherData.errorMsg
            })
        }).catch(err => {
            return res.send({
                error: err.errorMsg
            })
        })
    }).catch(data => {
        return res.send({
            error: data.errorMsg
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Allen',
        errorMsg: 'Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Allen',
        errorMsg: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

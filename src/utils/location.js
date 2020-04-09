const axios = require('axios')

const geolocation = {
    lat: 0,
    long: 0,
    error: false,
    errorMsg: ''
}

mapboxData = async (location) => {
    const mapBoxAK = process.env.MAPBOX_API_KEY
    console.log(mapBoxAK)
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapBoxAK}&limit=3`
    return await axios({
        method: 'get',
        url: mapBoxUrl,
        responseType: 'json'
    }).then(res => {
        if (res.data.features.length === 0) {
            geolocation.lat = null
            geolocation.long = null
            geolocation.error = true
            geolocation.errorMsg = 'Unable to find location. Try another search.'
            return geolocation
        }
        geolocation.lat = res.data.features[0].center[1]
        geolocation.long = res.data.features[0].center[0]
        geolocation.error = false
        geolocation.errorMsg = ''
        return geolocation
    }).catch(err => {
        geolocation.lat = null
        geolocation.long = null
        geolocation.error = true
        geolocation.errorMsg = 'Unable to connect to location services!'
        return geolocation
    })

}

module.exports = mapboxData;
const request = require('request')

const geocode = (address, callback) => {
    const { geocodeApiKey } = require('./api-keys')
    const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) +
        '.json?access_token=' +
        geocodeApiKey +
        '&limit=1'

    request({ url, json: true }, (error, { body }) => {
        //console.log(response.body.features.length)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode

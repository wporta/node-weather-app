const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const { forecastApiKey } =
        process.env.forecastApiKey || require('./api-keys')

    const url =
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
        latitude +
        '&lon=' +
        longitude +
        '&appid=' +
        forecastApiKey +
        '&units=metric'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temp = body.main.temp
            const name = body.name
            callback(
                undefined,
                `It is currently ${temp} degrees out in ${name}.`
            )
        }
    })
}

module.exports = forecast

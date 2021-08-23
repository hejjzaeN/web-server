const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url =`http://api.weatherstack.com/current?access_key=dad2e7a23c5e4a45f9f19875273e0457&query=${longtitude},${latitude}`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Connection error')
        } else if (body.error) {
            callback(body.error.info)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. This is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}.`)
        }
    })
}

module.exports = forecast
const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGVqanphZW4iLCJhIjoiY2tybnA1cGFkMG5zMzJ3cnExcmt3cHkxdyJ9.fd4IPCPYRB19bPoLtW8UIQ&limit=1`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Connection error')
        } else if (body.features.length === 0) {
            callback('Invalid location')
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longtitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
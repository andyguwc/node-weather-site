const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1IjoiYW5keWd1d2MiLCJhIjoiY2p3azZ6dmlpMGpjejRjcGM4eXdzYmU0NiJ9.0GjuCyyeltVLmFbor32pQQ'

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
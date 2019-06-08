const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ef48cd9ba6644492444c6952b58498c9/'+latitude+','+longitude+'?units=si'
    // console.log(url)
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Unable to find location'. undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently "+ body.currently.temperature + " degrees. "+"There is a " + body.currently.precipProbability + "% to rain")
        }
    })
}

module.exports = forecast



const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0571fb188bf13ad3cf13eb0c996b74d8&query='+ latitude +','+ longitude
    request({url:url,json:true} , (error,response) => {
        if(error){
            callback('unable to connect location services',undefined)
        }else if(response.body.error){
            callback('unable to find location, try another search',undefined)
        }else{
            callback(undefined,{
                temperature: response.body.current.temperature,
                weather_descriptions : response.body.current.weather_descriptions[0],
            })
        }
    })
}

module.exports = forecast

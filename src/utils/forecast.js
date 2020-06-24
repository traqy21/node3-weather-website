const request = require('request')
 
const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=f91ebed283b83f437b0dc526d421499b&query=' + latitude +',' + longitude +'&units=f'      
    request({url: url, json:true}, (error, { body } = response) => { 
 
        if(error){
            callback('unable to connect', undefined)
        } else if(body.error){
            callback('unableto find location', undefined)
        } else {
            const currentData = body.current; 
            // callback(undefined, {
            //     description: currentData.weather_descriptions[0],
            //     temperature: currentData.temperature,
            //     feelslike: currentData.feelslike
            // }) 
            callback(undefined, "It is " + currentData.temperature + " degrees, " + currentData.weather_descriptions[0] + " and feels like " + currentData.feelslike + ".") 
        }
    })
}

module.exports = forecast


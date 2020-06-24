const request = require('request')

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidHJhcXkyMSIsImEiOiJja2JkdHBudncwZjdjMnpvaW5lZ2lqZDllIn0.PuhvMALtfB4yXsskcfu22Q&limit=1'    
    request({url: geocodeUrl, json:true}, (error, { body } = response ) => { 
        if(error){
            callback('unableto connect', undefined)
        } else { 
            if(body.features.length > 0){
                const centerArray = body.features[0].center
                const latitude = centerArray[1]
                const longitude = centerArray[0]
                callback(undefined, {
                    latitude: latitude,
                    longitude: longitude,
                    location: body.features[0].place_name
                })
            } else {
                callback('no matching result', undefined)
                
            }
           
        
        }
        
    })

}

module.exports = geocode
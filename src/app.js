const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectory = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))
 
 
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Aries"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Aries"
    })
})
 
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "Help View",
        name: "Aries"
    })
})
 
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "You must provide an address."
        })
    }   

    geocode(req.query.address, (error,  {latitude, longitude, location} = {})=> {
    
        if(error){ 
            return res.send({
                error: error
            })
        }
       
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            } 
            
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    }) 
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide search term."
        })
    }
    console.log(req.query.search);
    res.send({
         products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Aries",
        error: "Help article not found", 
    })
})

app.get('*', (req, res) => { 
    res.render('404', {
        title: "404",
        name: "Aries",
        error: "Page not found", 
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port 3000')
})
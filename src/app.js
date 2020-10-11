const express = require('express')
const path = require('path')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()
const port = process.env.PORT

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide an address!'
        })
    }
    geocode(req.query.address,(error,data) =>{
        if(error){
            return res.send({error})
        }
        
        forecast(data.latitude,data.longitude,(error,forecastdata) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                temperature:forecastdata.temperature,
                weather: forecastdata.weather_descriptions,
                location:data.location

            })
        })
    })

})



app.listen(port, () => {
    console.log('Server is up on port '+ port)
}) 

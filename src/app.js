const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths fore Express config
const publiDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handblehars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publiDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Mike"
    })
})

// what to send back when visits specific page
// usually send back html or JSON

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'sara'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is help message.",
        title: "Help",
        name: 'mike2'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
          return res.send({error: error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
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

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) =>{
    res.render('404', {
        title: '404',
        name: 'mike',
        errorMessage: 'Help message not found'
    }
    
    )
    // res.send('Help article not found')
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mike',
        errorMessage: 'page not found' 
    }
    
    )
})


app.listen(port, () => {
    console.log('server is up on port'+port)
})




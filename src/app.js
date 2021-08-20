const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require(path.join(__dirname,'../utils/geocode'))
const forecast = require(path.join(__dirname,'../utils/forecast'))

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pavel Vinnikov'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Pavel Vinnikov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Pavel Vinnikov',
        helpText: 'Some text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address isn't provided"
        })
    }

    geocode(req.query.address, (error, { longtitude, latitude, location } = {}) => {
        if (error) return res.send({ error })
        forecast(longtitude, latitude, (error, forecastData) => {
            if (error) return res.send({ error })
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.render('weather', {
    //     title: 'Weather',
    //     name: 'Pavel Vinnikov',
    //     helpText: 'Some text',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pavel Vinnikov',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pavel Vinnikov',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
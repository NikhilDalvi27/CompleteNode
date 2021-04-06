const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('../../../6_AsynchronousNode/WeatherApp/utils/geocode')
const foreCast = require('../../../6_AsynchronousNode/WeatherApp/utils/forecast')

//todo this stores our express application
const app = express();

//todo Define path for express config
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//todo this is for setting up the HandleBar
// which is used as a templating Engine

//todo setup handlebar engine and views location
// and register the partials
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


//todo setting up static directory to serve
app.use(express.static(publicDirectory));



//todo Dynamic Content is Served using hbs
// using render Option
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Nikhil'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Nikhil'
    });
})

// todo this is how individual routing is done
//  for static content we use SEND
app.get('/weather',(req,res)=>{
    console.log(req.query);
    if( !req.query.address ){
        return res.send({
            error:'You must provide an Address'
        });
    }
    //todo note how default value is provided to the destructred Object
    geoCode(req.query.address,(error, {latitude,longitude,location}={})=>{
           if(error){
               return res.send({error});
           }

            foreCast(longitude,latitude,(error, foreCastData)=>{
                if(error){
                    return res.send({error});
                }
                res.send({
                    forecast:foreCastData,
                    location,
                    address: req.query.address
                });
            })
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
       return  res.send({
            error:'You must provide a search term'
        });
    }
    res.send({
        products:[]
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Nikhil'
    });
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Nikhil Dalvi',
        errorMessage:'Help Article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Nikhil Dalvi',
        errorMessage:'Page not found!'
    })
})



app.listen(3000,()=>{
    console.log(`Server running on port 3000`);
})
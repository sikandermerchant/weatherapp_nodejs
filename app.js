const express = require('express');
const https = require('https'); ///https inbuilt nodejs packagae - https://nodejs.org/api/https.html#https_https_get_url_options_callback
const bodyParser = require('body-parser'); ////inbuild nodejs package to parse incoming request bodies in a middleware - https://www.npmjs.com/package/body-parser#bodyparserjsonoptions
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));///necessary for using body-parser package


app.get('/',(req,res)=>{
  res.sendFile(`${__dirname}/index.html`);
});
app.post('/',(req,res)=>{
   const query = req.body.cityName,
        apiKey = 'd7bfdf47b3a3edff2e5f20af47b359d9',
        unit = 'metric',
        url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
  https.get(url, (response)=>{
    // console.log(response);
    console.log(`status code: ${response.statusCode}`);
    console.log(`response headers: ${response.headers}`);
    response.on('data',(data)=>{
      console.log(data); ///will display data in bytes
      ///we convert that data in JSON objects by wrapping it in JSON.parse as below:
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const feels_like = weatherData.main.feels_like;
      console.log(feels_like);
      const desc = weatherData.weather[0].description;
      console.log(desc);
      const icon = weatherData.weather[0].icon;
      console.log(icon);
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const tempMin = weatherData.main.temp_min;
      console.log(tempMin);
      const tempMax = weatherData.main.temp_max;
      console.log(tempMax);
      // res.send(`
      // <h1>The weather currently in London is ${desc} and the temperature is : ${temp}</h1>
      // `);
      ///we can also do multiple res.write() methods and the send it with a single res.send() as below
      res.write(`<h1>The temperature in ${query} is ${temp}</h1>`);
      res.write(`<p>The weather feels like ${desc}<p>`);
      res.write(`<img src="${imageURL}">`);
      res.send()

    });

  });
  // res.send('Server is up and running')
});
app.listen(3000,()=>{
  console.log('Server is running on port 3000');
});
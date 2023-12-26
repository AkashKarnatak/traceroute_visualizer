const express = require('express')
const bparser = require('body-parser')
const path = require('path')
const axios = require('axios')
const traceroute = require('traceroute');

const app = express()

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates/views'));

const port = 8080

app.use(express. static(path.join(__dirname, './public'), {extensions: ["html"]}))
app.use(bparser.urlencoded({ extended: true })); 

app.post('/map', (req, res) => {
  
  console.log(req.body.server)

  traceroute.trace(req.body.server, async (err,hops) => {
    if (err) {
      res.sendStatus(404)
      return
    }

    let serverInfoList = []

    for await (const hop of hops) {
      if (!hop) continue
      ipRes = await axios.get(`http://ipinfo.io/${Object.keys(hop)[0]}`)
      if (ipRes.data.bogon || !ipRes.data.loc) continue
      const [lat, lng] = ipRes.data.loc.split(',')
      serverInfoList.push({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        ip: ipRes.data.ip
      })
    }

    console.log(serverInfoList)
    console.log('-------------------\n')
    res.render('map', {
      coords: JSON.stringify(serverInfoList),
    })

  });

})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

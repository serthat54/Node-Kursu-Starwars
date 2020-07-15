var app = require('express')();
var request = require('request');
var fs = require('fs');

app.set("view engine", "ejs");

app.use((req, res, next) => {
    var zaman = new Date().toString();
    var log = zaman + " " + req.url;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });

    next();

})

app.use((req, res, next) => {
    res.render('calisma');
})


app.get('/', (req, res) => {

    res.render("arama");


});


app.get('/sonuc', (req, res) => {

    var sorgu = req.query.sorgu;
    var url = "https://swapi.dev/api/people/?search=" + sorgu;

    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var veri = JSON.parse(body);
            res.render('sonuc', {
                veri: veri
            });
        }
    })
});

app.listen(3000);
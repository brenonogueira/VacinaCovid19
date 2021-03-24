require('./models/db'); 
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const vacinaController = require('./controllers/vacinaController');

var app = express();  
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json())


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts' }));

app.listen(3000, () => {
    console.log('Servidor express iniciado na porta: 3000');
});

app.use('/vacina', vacinaController);







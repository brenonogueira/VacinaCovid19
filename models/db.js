const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vacinasDB', { useNewUrlParser: true }, (err) => {
    if(!err) { console.log('Conexão com o MONGO DB feita com sucesso')
    } else {console.log('Erro ao conectar com o MONGO DB: ' + err)}
});

require('./vacinas.model');
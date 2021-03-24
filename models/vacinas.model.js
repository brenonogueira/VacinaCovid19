const mongoose = require('mongoose');

var vacinaSchema = new mongoose.Schema({
    cns: {
        type: String
    },
    cpf:{
        type: String
    },
    nome:{
        type: String
    },
    nomeMae:{
        type: String
    },
    nascimento:{
        type: String
    },
    sexo: {
        type: String
    },
    categoria:{
        type: String
    },
    contato:{
        type: String
    },
    endereco:{
        type: String
    } 
});

mongoose.model('Vacina', vacinaSchema);
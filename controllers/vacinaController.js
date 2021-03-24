const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Vacina = mongoose.model('Vacina');

router.get('/', (req, res) => {
    res.render("vacina/addOuEditar", {
        viewTitle: "Inserir paciente"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
        inserirDado(req, res);
    else 
        atualizarDado(req, res);
});

function inserirDado(req, res) {
    var paciente = new Vacina(); 
    paciente.cns = req.body.cns;
    paciente.cpf = req.body.cpf;
    paciente.nome = req.body.nome;
    paciente.nomeMae = req.body.nomeMae;
    paciente.nascimento = req.body.nascimento;
    paciente.sexo = req.body.sexo;
    paciente.categoria = req.body.categoria;
    paciente.contato = req.body.contato;
    paciente.endereco = req.body.endereco;
    paciente.save((err, doc) => {
        if(!err)
            res.redirect('vacina/list');
    });
}


function atualizarDado(req, res) {
    Vacina.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('vacina/list'); }
        else {
            if (err.nome == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("vacina/addOuEditar", {
                    viewTitle: 'Paciente atualizado',
                    paciente: req.body
                });
            }
            else
                console.log('Erro durante a atualização do paciente : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Vacina.find((err, docs) => {
        if(!err) {
            res.render("vacina/list", {
                list: docs
            });
        } else {
            console.log('Erro ao recuperar a lista de pacientes:' + err);
        }
    }).lean();
});

router.get('/:id', (req, res) => {
    Vacina.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("vacina/addOuEditar", {
                viewTitle: "Paciente atualizado!",
                paciente: doc
            });
        }
    }).lean();
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nome':
                body['nome'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/delete/:id', (req, res) => {
    Vacina.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/vacina/list');
        }
        else { console.log('Erro ao apagar paciente :' + err); }
    });
});

module.exports = router;


var express = require('express');
var router = express.Router();
const sequelize = require('../helpers/bd');
const AutenticaRouter = require('./AutenticaRouter');

const Agendamento = require('../model/Agendamento');
const Especialidade = require('../model/Especialidade');
const Funcionario = require('../model/Funcionario');
const FuncionarioEspecialidade = require('../model/FuncionarioEspecialidade');
const Horario = require('../model/Horario');
const Servico = require('../model/Servico');
const Usuario = require('../model/Usuario');
const Salao = require('../model/Salao');

router.get('/install', async function(req, res) {
    try {
        await sequelize.sync();
        
        const usuarioAdmin = await Usuario.novo('admin', 'admin', 'admin');
        await Usuario.makeAdmin(usuarioAdmin.id_usuario);

        const usuario1 = await Usuario.novo('Felizberto Tristão', 'felizberto@email.com', 'senha');
        const usuario2 = await Usuario.novo('Fernando Silva', 'fernando@email.com', 'senha');
        const usuario3 = await Usuario.novo('Joaquim Souza', 'joaquim@email.com', 'senha');
        const usuario4 = await Usuario.novo('Bartolomeu Souza', 'bartolomeu@email.com', 'senha');
        const usuario5 = await Usuario.novo('Jefterina Souza', 'jefterina@email.com', 'senha');

        const salao = await Salao.novo(usuarioAdmin.id_usuario, 'Salão Corte na Régua', 'Rua das calçadas, 666 - Jequitimar - BC', '(11) 9876-5432');

        const funcionario1 = await Funcionario.novo(usuario1.id_usuario, salao.id_salao, 'Bertinho');
        const funcionario2 = await Funcionario.novo(usuario2.id_usuario, salao.id_salao, 'Fernandão');
        const funcionario3 = await Funcionario.novo(usuario3.id_usuario, salao.id_salao, 'Juca');

        const especialidade1 = await Especialidade.novo('Cabelo');
        const especialidade2 = await Especialidade.novo('Unha');
        const especialidade3 = await Especialidade.novo('Barba');
        const especialidade4 = await Especialidade.novo('Maquiagem');
        const especialidade5 = await Especialidade.novo('Estética Facial');

        const especialidadeFuncionario1 = await FuncionarioEspecialidade.novo(funcionario1.id_funcionario, especialidade1.id_especialidade);
        const especialidadeFuncionario2 = await FuncionarioEspecialidade.novo(funcionario1.id_funcionario, especialidade2.id_especialidade);
        const especialidadeFuncionario3 = await FuncionarioEspecialidade.novo(funcionario2.id_funcionario, especialidade2.id_especialidade);
        const especialidadeFuncionario4 = await FuncionarioEspecialidade.novo(funcionario2.id_funcionario, especialidade3.id_especialidade);
        const especialidadeFuncionario5 = await FuncionarioEspecialidade.novo(funcionario3.id_funcionario, especialidade3.id_especialidade);
        const especialidadeFuncionario6 = await FuncionarioEspecialidade.novo(funcionario3.id_funcionario, especialidade4.id_especialidade);
        const especialidadeFuncionario7 = await FuncionarioEspecialidade.novo(funcionario3.id_funcionario, especialidade5.id_especialidade);

        const servico1 = await Servico.novo(especialidade1.id_especialidade, 'Corte na régua', 50, 60);
        const servico2 = await Servico.novo(especialidade2.id_especialidade, 'Francesinha', 40, 60);
        const servico3 = await Servico.novo(especialidade3.id_especialidade, 'Barba completa', 30, 60);
        const servico4 = await Servico.novo(especialidade4.id_especialidade, 'Maquiagem para festas', 60, 90);
        const servico5 = await Servico.novo(especialidade5.id_especialidade, 'Limpeza de pele', 40, 60);

        const horario1 = await Horario.novo(funcionario1.id_funcionario, 'Segunda', '2023-12-23T10:00:00Z', '2023-12-23T11:00:00Z', 'disponivel');
        const horario2 = await Horario.novo(funcionario2.id_funcionario, 'Terça', '2023-12-24T14:00:00Z', '2023-12-24T15:00:00Z', 'disponivel');
        const horario3 = await Horario.novo(funcionario3.id_funcionario, 'Quarta', '2023-12-25T16:00:00Z', '2023-12-25T17:00:00Z', 'disponivel');
        const horario4 = await Horario.novo(funcionario1.id_funcionario, 'Quinta', '2023-12-26T18:00:00Z', '2023-12-26T19:00:00Z', 'disponivel');
        const horario5 = await Horario.novo(funcionario2.id_funcionario, 'Sexta', '2023-12-27T20:00:00Z', '2023-12-27T21:00:00Z', 'disponivel');
        const horario6 = await Horario.novo(funcionario3.id_funcionario, 'Sabado', '2023-12-28T22:00:00Z', '2023-12-28T23:00:00Z', 'disponivel');
        const horario7 = await Horario.novo(funcionario1.id_funcionario, 'Domingo', '2023-12-29T00:00:00Z', '2023-12-29T01:00:00Z', 'disponivel');

        const agendamento1 = await Agendamento.novo(usuario4.id_usuario, funcionario1.id_funcionario, servico1.id_servico, horario1.id_horario, 'agendado');
        const agendamento2 = await Agendamento.novo(usuario5.id_usuario, funcionario2.id_funcionario, servico2.id_servico, horario2.id_horario, 'agendado');
        const agendamento3 = await Agendamento.novo(usuario5.id_usuario, funcionario3.id_funcionario, servico3.id_servico, horario3.id_horario, 'agendado');
        const agendamento4 = await Agendamento.novo(usuario4.id_usuario, funcionario1.id_funcionario, servico1.id_servico, horario4.id_horario, 'agendado');
        const agendamento5 = await Agendamento.novo(usuario5.id_usuario, funcionario2.id_funcionario, servico2.id_servico, horario5.id_horario, 'agendado');
        const agendamento6 = await Agendamento.novo(usuario5.id_usuario, funcionario3.id_funcionario, servico3.id_servico, horario6.id_horario, 'agendado');
        const agendamento7 = await Agendamento.novo(usuario4.id_usuario, funcionario1.id_funcionario, servico1.id_servico, horario7.id_horario, 'agendado');

        res.json({ mensagem: "Tabelas criadas com sucesso", tabelas: {
            usuarioAdmin: usuarioAdmin,
            usuario1: usuario1,
            usuario2: usuario2,
            usuario3: usuario3,
            usuario4: usuario4,
            usuario5: usuario5,
            salao: salao,
            funcionario1: funcionario1,
            funcionario2: funcionario2,
            funcionario3: funcionario3,
            especialidade1: especialidade1,
            especialidade2: especialidade2,
            especialidade3: especialidade3,
            especialidade4: especialidade4,
            especialidade5: especialidade5,
            especialidadeFuncionario1: especialidadeFuncionario1,
            especialidadeFuncionario2: especialidadeFuncionario2,
            especialidadeFuncionario3: especialidadeFuncionario3,
            especialidadeFuncionario4: especialidadeFuncionario4,
            especialidadeFuncionario5: especialidadeFuncionario5,
            especialidadeFuncionario6: especialidadeFuncionario6,
            especialidadeFuncionario7: especialidadeFuncionario7,
            servico1: servico1,
            servico2: servico2,
            servico3: servico3,
            servico4: servico4,
            servico5: servico5,
            horario1: horario1,
            horario2: horario2,
            horario3: horario3,
            horario4: horario4,
            horario5: horario5,
            horario6: horario6,
            horario7: horario7,
            agendamento1: agendamento1,
            agendamento2: agendamento2,
            agendamento3: agendamento3,
            agendamento4: agendamento4,
            agendamento5: agendamento5,
            agendamento6: agendamento6,
            agendamento7: agendamento7
        }});
    } catch (e) {
        res.status(500).json({ mensagem: "Falha ao criar tabelas" + e});
    }
});

router.use('/autenticacao', AutenticaRouter);

router.get('/', (req, res) => {
    res.send('Bem-vindo à página inicial');
});


module.exports = router
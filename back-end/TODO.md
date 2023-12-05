# Identificar alterações necessarias nos roteadores e implementa-las:

- [x] UsuarioRouter (Nenhuma alteração necessaria)
- [ ] SalaoRouter
- [ ] LoginRouter
- [ ] IndexRouter (Usar o LoginRouter, unificar cadastro e login em apenas um router, remover a logica de verificação se o usuario ja existe da camada dos routers e inserir dentro do modelo Usuairo, implementar o metodo install completo)
- [ ] FuncionarioRouter 
- [ ] EspecialidadeRouter
- [ ] AgendamentoRouter (Implementar tabulação na consulta, Implementar logica de negocios para cancelamentos e novos agendamentos)

# Fazer verificação dos inputs com Joi

## Agendamento
- [x] Implementar metodo de cancelar no Modelo Agendamento
- [x] /novo (CRUD)
- [x] /getAgendamentoPorCliente
- [x] /listar (CRUD) (a implementar)
- [x] /excluir (CRUD)
- [x] /cancelar
- [x] /editar (CRUD) (a implementar)

## Usuario
- [x] /novo (CRUD)
- [x] /listar (CRUD)
- [x] /makeAdmin
- [x] /editar (CRUD) (a implementar)
- [x] /excluir (CRUD) (a implementar)
- [x] /retiraAdmin (a implementar)

## Salao
- [ ] /novo (CRUD)
- [ ] /editar (CRUD) (a implementar)
- [ ] /excluir (CRUD) (a implementar)
- [ ] /listar (CRUD) (a implementar)

## Funcionario
- [x] /novo (CRUD)
- [x] /novaEspecialidade
- [x] /novoHorario
- [x] /listarHorariosPorId
- [x] /listarHorariosDisponiveisPorId
- [x] /listarFuncionariosPorEspecialidade
- [x] /excluir (CRUD) (a implementar)
- [x] /editar (CRUD) (a implementar)
- [x] /listar (CRUD) (a implementar)
 
## Especialidade
- [x] /novo (CRUD)
- [x] /novoServico
- [x] /listar (CRUD)
- [x] /listarServicosPorEspecialidade
- [ ] /excluir (CRUD) (a implementar)
- [x] /editar (CRUD) (a implementar)

## Index
- [x] AuthRouter
- [x] /login
- [x] /cadastro

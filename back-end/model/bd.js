const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '0607',
    database: 'AgendamentosBD'
});


const UsuarioModel = sequelize.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        bcrypt: true
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});
const SalaoModel = sequelize.define('salao', {
    id_salao: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_dono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    nome_salao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco_salao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fone_salao: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'saloes'
});

SalaoModel.belongsTo(UsuarioModel, {foreignKey: 'id_dono', targetKey: 'id_usuario'});

const FuncionarioModel = sequelize.define('funcionarios', {
    id_funcionario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    id_salao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'saloes',
            key: 'id_salao'
        }
    }
});
FuncionarioModel.belongsTo(UsuarioModel, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
FuncionarioModel.belongsTo(SalaoModel, { foreignKey: 'id_salao', targetKey: 'id_salao' });

const EspecialidadeModel = sequelize.define('especialidades', {
    id_especialidade: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_especialidade: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
});

const FuncionarioEspecialidadeModel = sequelize.define('funcionarios_especialidades', {
    id_funcionario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'funcionarios',
            key: 'id_funcionario'
        }
    },
    id_especialidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'especialidades',
            key: 'id_especialidade'
        }
    }
});

FuncionarioEspecialidadeModel.belongsTo(FuncionarioModel, { foreignKey: 'id_funcionario', targetKey: 'id_funcionario' });
FuncionarioEspecialidadeModel.belongsTo(EspecialidadeModel, { foreignKey: 'id_especialidade', targetKey: 'id_especialidade' });

const ServicoModel = sequelize.define('servicos', {
    id_servico: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_especialidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'especialidades',
            key: 'id_especialidade'
        }
    },
    nome_servico: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    custo_servico: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duracao_servico: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

ServicoModel.belongsTo(EspecialidadeModel, { foreignKey: 'id_especialidade', targetKey: 'id_especialidade' });

const AgendamentoModel = sequelize.define('agendamentos', {
    id_agendamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    id_funcionario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'funcionarios',
            key: 'id_funcionario'
        }
    },
    id_servico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'servicos',
            key: 'id_servico'
        }
    },
    data_agendamento: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

AgendamentoModel.belongsTo(UsuarioModel, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
AgendamentoModel.belongsTo(FuncionarioModel, { foreignKey: 'id_funcionario', targetKey: 'id_funcionario' });
AgendamentoModel.belongsTo(ServicoModel, { foreignKey: 'id_servico', targetKey: 'id_servico' });

  

module.exports = {
    sequelize: sequelize,
    SalaoModel: SalaoModel,
    UsuarioModel: UsuarioModel,
    FuncionarioModel: FuncionarioModel,
    EspecialidadeModel: EspecialidadeModel,
    FuncionarioEspecialidadeModel: FuncionarioEspecialidadeModel,
    ServicoModel: ServicoModel,
    AgendamentoModel: AgendamentoModel
}
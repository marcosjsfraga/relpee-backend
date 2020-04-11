module.exports = {
    username: "declabs",
    password: "1q2w3e",
    database: "relpee",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true, // Setar Sequelize não colocar 'S' nome tabela
    }
};

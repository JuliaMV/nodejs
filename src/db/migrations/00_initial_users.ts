import { DataTypes, QueryInterface } from 'sequelize';

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};

const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('Users');
};

export default { up, down };

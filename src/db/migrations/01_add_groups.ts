import { DataTypes, QueryInterface } from 'sequelize';

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('Groups', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  });
};

const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('Groups');
};

export default { up, down };

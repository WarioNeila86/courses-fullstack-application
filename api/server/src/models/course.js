module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Course;
};
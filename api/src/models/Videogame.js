const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      release: {
        type: DataTypes.DATEONLY, //DATE save YYYY-MM-DD with timezone //DATEONLY saves YYYY-MM-DD
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      /*platforms: {
        type: DataTypes.STRING,   //I will create a new table to save all the platforms
      },*/
      background_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdByUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};

var DataTypes = require('sequelize/lib/data-types')

module.exports=(sequelize,Datatypes) =>{
    const Group = sequelize.define('book',{
        id:{
            type:Datatypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        author: {
            type: Datatypes.STRING,
            allowNull: true,
        },

        title: {
            type: Datatypes.STRING,
            allowNull: true,
        },

        ISBN: {
            type: Datatypes.STRING,
            allowNull: true,
        },

        release_date: {
            type: Datatypes.DATEONLY,
            allowNull: true,
        },
    },
    {
        paranoid:true,
        timestamps:false,
        freezeTableName: true
    }
    )
    return Group;
}
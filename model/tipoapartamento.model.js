const connect = require('./database.js')


const clienteSchema = new Schema({ //Son todas las propiedades que estaran en la base de datos
    nombre:{type: String, require:true},
    apellido:{type:String, require:true},
    edad:{type:String, require:true}
},{
    timestamps:true //Es una propiedad ya dada que genera la fecha en la que se ingreso un dato
})

module.exports = model('cliente', clienteSchema)
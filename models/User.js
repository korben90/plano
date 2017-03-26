var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    Patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
    Appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
    settings: { type: Schema.Types.Mixed }
});

module.exports = Mongoose.model('User', UserSchema, 'User');
var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var PatientSchema = new Schema({
    patient_id: { type: Schema.Types.ObjectId, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    cell: { type: String },
    ortho_id: { type: Schema.Types.ObjectId, ref: 'user' }
});
var patient = Mongoose.model('patient', PatientSchema);

module.exports = {
    Patient: patient
};
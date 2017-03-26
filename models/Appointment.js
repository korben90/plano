var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var AppointmentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true, index: true },
    patient: { type: Schema.Types.ObjectId, ref: 'patient', required: true, index: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    notes: { type: String },
    achieved: { type: Boolean, default: 0 },
    sms_notification_date: { type: Date },
    mail_notification_date: { type: Date }
});

module.exports = Mongoose.model('Appointment', AppointmentSchema, 'Appointment');
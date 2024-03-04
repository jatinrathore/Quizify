const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const otpVerificationSchema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    otpToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
});

otpVerificationSchema.pre("save", async function (next) {
    if (this.isModified("otpToken")) {
        const hashedOTP = await bcrypt.hash(this.otpToken, Number(process.env.SALT));
        this.otpToken = hashedOTP;
    }

    next();
});

otpVerificationSchema.methods.compareToken = async function (token) {
    const res = await bcrypt.compare(token, this.otpToken);

    return res;
}

const OtpVerification = mongoose.model("OtpVerification", otpVerificationSchema);

exports.OtpVerification = OtpVerification;

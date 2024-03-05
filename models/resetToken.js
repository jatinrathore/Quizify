const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const resetTokenSchema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    resetToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
});

resetTokenSchema.pre("save", async function (next) {
    if (this.isModified("resetToken")) {
        const hashedToken = await bcrypt.hash(this.resetToken, Number(process.env.SALT));
        this.resetToken = hashedToken;
    }

    next();
});

resetTokenSchema.methods.compareToken = async function (token) {
    const res = await bcrypt.compare(token, this.resetToken);

    return res;
}
const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

exports.ResetToken = ResetToken;

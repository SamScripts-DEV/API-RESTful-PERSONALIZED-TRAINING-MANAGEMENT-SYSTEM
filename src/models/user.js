import { Schema, model } from 'mongoose';
import bcryptjs  from 'bcryptjs';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        rol: {
            type: String,
            enum: ['administrador', 'entrenador', 'cliente'],
            required: true,
            default: 'cliente',
        },
        status: {
            type: Boolean,
            default: true,
        },
        token: {
            type: String,
            default: null,
        },
        confirmEmail: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
            required: false,
        },
        codeExpiry: {
            type: Date,
            required: false,
        },
        codePasswordUsed: {
            type: Boolean,
            default: false,
        },
        logout: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.methods.encryptPassword = async (password) => {
    return await bcryptjs.hash(password, await bcryptjs.genSalt(10));
};

userSchema.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

userSchema.methods.createToken = function () {
    this.token = Math.random().toString(36).slice(2);
};

export default model('User', userSchema);

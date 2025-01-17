import { createTransport } from 'nodemailer';
import 'dotenv/config';
import { randomInt } from 'crypto';

const {
    HOST_MAILTRAP,
    PORT_MAILTRAP,
    USER_MAILTRAP,
    PASS_MAILTRAP,
    URL_FRONT,
} = process.env;

let transporter = createTransport({
    service: 'gmail',
    host: HOST_MAILTRAP,
    port: PORT_MAILTRAP,
    auth: {
        user: USER_MAILTRAP,
        pass: PASS_MAILTRAP,
    },
});

const mailResponse = (err, { message }) => console.log(err ? err : message);

export const generateVerificationCode = () =>
    randomInt(100000, 999999).toString();

export const sendMailToConfirm = (userMail, token) => {
    transporter.sendMail(
        {
            from: USER_MAILTRAP,
            to: userMail,
            subject: 'Confirmación de correo - RutinFit',
            html: `<h1>Confirma tu correo</h1>
        <p>Para confirmar tu correo da click en el siguiente enlace</p>
        <a href="${URL_FRONT}/confirm/${token}">Click aqui</a>
        `,
        },
        mailResponse,
    );
};

export const sendMailToCoach = (userMail, password, nameCoach) => {
    transporter.sendMail(
        {
            from: USER_MAILTRAP,
            to: userMail,
            subject: 'Bienvenido a RutinFit',
            html: `<h1>Bienvenido a RutinFit</h1>
        <p>Hola ${nameCoach} es un gusto que trabajes junto a nostros, a continuación encontraras la contraeña con la que podrás acceder al sistema de entrenadores</p>

        <h3>Contraseña: ${password}</h3>
        <p>Por favor no compartas esta contraseña con nadie</p>
        <a href = ${URL_FRONT}>Click aqui para iniciar sesión</a>
        <p>Gracias por ser parte de RutinFit.</p>
        `,
        },
        mailResponse,
    );
};

export const sendMailToRecoveryPassword = (userMail, token) => {
    transporter.sendMail(
        {
            from: USER_MAILTRAP,
            to: userMail,
            subject: 'Recuperación de contraseña - RutinFit',
            html: `<h1>Recuperación de contraseña</h1>
        <p>Para recuperar tu contraseña da click en el siguiente enlace</p>
        <a href="${URL_FRONT}/recovery/${token}">Click aqui</a>
        `,
        },
        mailResponse,
    );
};

export const sendVerificationMail = (userMail, code) => {
    transporter.sendMail(
        {
            from: USER_MAILTRAP,
            to: userMail,
            subject: 'Código de verificación - RutinFit',
            html: `<h1>Código de verificación</h1>
        <p>Para confirmar tu correo ingresa el siguiente código</p>
        <h3>${code}</h3>
        `,
        },
        mailResponse,
    );
};

export const sendEmailRutin = async (req, res) => {
    const { nombre, correo, usuario, asunto, mensaje } = req.body;

    try {
        transporter.sendMail(
            {
                from: correo,
                to: USER_MAILTRAP, // rutinfit24@gmail.com
                subject: `${asunto} - ${nombre}`,
                html: `
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Correo:</strong> ${correo}</p>
                <p><strong>¿Es usuario?:</strong> ${usuario}</p>
                <p><strong>Mensaje:</strong> ${mensaje}</p>
            `,
            },
            mailResponse,
        );
        res.status(200).json({ res: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ res: 'Error al enviar el correo', error });
    }
};

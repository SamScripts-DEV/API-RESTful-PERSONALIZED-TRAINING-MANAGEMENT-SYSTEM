import User from '../models/user.js';
import { generateToken } from '../helpers/JWT.js';
import {
    sendMailToRecoveryPassword,
} from '../config/nodemailer.js';

export const userRegister = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({
                res: 'Rellene todos los campos antes de enviar la solicitud',
            });
        
        if (await User.exists({ email }))
            return res
                .status(400)
                .json({ res: 'El email ya se encuentra registrado' });

        const newUser = new User(req.body);
        newUser.password = await newUser.encryptPassword(password);

        await newUser.save();

        res.status(201).json({ res: 'Registro exitoso', newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor' });
    }
};

// export const confirmEmail = async (req, res) => {
//     if(!(req.params.token)) return res.status(400).json({res: 'No se puede validar la cuenta'})

//     const userBDD = await User.findOne({token: req.params.token})
//     if(!userBDD?.token) return res.status(404).json({res: 'La cuenta ya ha sido validada'})

//     userBDD.token = null
//     userBDD.confirmEmail = true
//     await userBDD.save()
//     res.status(200).json({res: 'Cuanta validada puedes iniciar sesión'})
// };

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ res: 'Rellene todos los campos' });

        const userBDD = await User.findOne({ email }).select(
            '-status -createdAt -updatedAt -token',
        );

        if (!userBDD)
            return res.status(404).json({
                res: 'El email no se encuentra registrado por favor registrese',
            });

        if (!await userBDD.matchPassword(password))
            return res.status(401).json({ res: 'Contraseña Incorrecta' });

        userBDD.logout = false;
        await userBDD.save();

        const { name, lastname, _id, rol } = userBDD;
        const token = generateToken(_id, rol);

        res.status(200).json({
            res: 'Login exitoso',
            token,
            name,
            lastname,
            email,
            rol,
            _id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userBDD._id, { logout: true });

        res.status(200).json({ res: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { body: { password, newpassword }, userBDD: { _id } } = req;

        const userBDD = await User.findById(_id);
        if (!await userBDD.matchPassword(password))
            return res.status(401).json({ res: 'Contraseña Incorrecta' });
    
        userBDD.password = await userBDD.encryptPassword(newpassword);
        await userBDD.save();
    
        res.status(200).json({ res: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const restorePassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email)
            return res.status(400).json({ res: 'Rellene todos los campos' });
    
        const userBDD = await User.findOne({ email });
    
        if (!userBDD)
            return res.status(404).json({ res: 'El email no se encuentra registrado' });
    
        await userBDD.createToken();
    
        sendMailToRecoveryPassword(email, userBDD.token);
        await userBDD.save();
    
        res.status(200).json({
            res: 'Correo enviado, revise su bandeja de entrada',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const confirmTokenPassword = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token)
            return res.status(400).json({ res: 'Token no encontrado' });
    
        const userBDD = await User.findOne({ token: token });

        if (userBDD?.token !== token)
            return res.status(404).json({ res: 'Token no valido' });
    
        await userBDD.save();
    
        res.status(200).json({
            res: 'Token confirmado, puede cambiar su contraseña',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const newPassword = async (req, res) => {
    const { body: { password, confirmPassword }, params: { token } } = req;

    if (!password || !confirmPassword) 
        return res.status(400).json({ res: 'Rellene todos los campos' });

    if (password !== confirmPassword) 
        return res.status(400).json({ res: 'Las contraseñas no coinciden' });

    try {
        const userBDD = await User.findOne({ token});

        if (userBDD?.token !== token) 
            return res.status(404).json({ res: 'Token no válido' });

        userBDD.token = null;
        userBDD.password = await userBDD.encryptPassword(password);

        await userBDD.save();

        res.status(200).json({ res: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const ViewProfile = async (req, res) => {
    try {
        const userBDD = await User.findById(req.userBDD._id).select(
            '-password -status -createdAt -updatedAt',
        );
        if (!userBDD)
            return res.status(404).json({ res: 'Usuario no encontrado' });
        res.status(200).json(userBDD);
    } catch (error) {
        1;
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor' });
    }
};

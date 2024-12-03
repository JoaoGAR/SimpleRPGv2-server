const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { getCharacterByUser } = require('../DAOs/CharacterDAO');
const UserDAO = require('../DAOs/UserDAO');
const User = require('../models/User');

class UserController {
    constructor() {
        this.userDAO = new UserDAO();
    }

    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            let user = await User.findOne({ where: { email } });
            if (user) {
                return res.status(400).json({ msg: 'E-mail já cadastrado.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '4h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, user });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Erro no servidor');
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            let user = await this.userDAO.getUser(null, email);
            if (!user) {
                return res.status(400).json({ msg: 'Credenciais inválidas' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Credenciais inválidas' });
            }

            const character = await getCharacterByUser(user.id);

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '4h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, user, character });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Erro no servidor');
        }
    }

    async me(req, res) {
        try {
            const user = await this.userDAO.getUser(req.user.id, null);
            const character = await getCharacterByUser(user.id);

            res.json({ user, character });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Erro no servidor');
        }
    }
}

module.exports = UserController;
const express = require('express');
const { connectDB } = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/character', require('./routes/character'));
app.use('/api/character/getInfo', require('./routes/character'));

app.use('/api/structure', require('./routes/structure'));
app.use('/api/structure/getById', require('./routes/structure'));
app.use('/api/structure/getNPCsByLocation', require('./routes/structure'));

app.use('/api/job', require('./routes/job'));
app.use('/api/job/startWork', require('./routes/job'));
app.use('/api/job/finish', require('./routes/job'));
app.use('/api/job/dismiss', require('./routes/job'));

app.use('/api/queue', require('./routes/queue'));

app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/inventory/equip/item', require('./routes/inventory'));

app.use('/api/skill', require('./routes/skill'));
app.use('/api/skill/save', require('./routes/skill'));

app.use('/api/battle', require('./routes/battle'));

app.use('/api/market', require('./routes/market'));
app.use('/api/market/buyItem', require('./routes/market'));

app.get('/', (req, res) => {
    res.send('API de Autenticação');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
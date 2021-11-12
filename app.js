require('dotenv').config();

const { URI_DATABASE = 'mongodb://localhost:27017/devdb', PORT = 3000 } = process.env;

const mongoose = require('mongoose');

const express = require('express');

const cors = require('cors');

const path = require('path');

const { errors } = require('celebrate');

const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { centralizedErrors } = require('./utils/handlerErrors/centralizedErrors');

const { rateLimiter } = require('./middlewares/rateLimiter');

mongoose.connect(URI_DATABASE);

app.use(cors({
  origin: ['http://moviefan.nomoredomains.monster', 'https://moviefan.nomoredomains.monster'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(helmet());

app.set('trust proxy', 1);

app.use(rateLimiter);

app.use(requestLogger);

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// МАРШРУТИЗАТОР
app.use(require('./routes/index'));

// ЛОГГЕР ОШИБОК
app.use(errorLogger);

// ОБРАБОТЧИК ОШИБОК CELEBRATE
app.use(errors());

// ЦЕНТРАЛИЗОВАННЫЙ ОБРАБОТЧИК ОШИБОК
app.use((err, req, res, next) => {
  centralizedErrors(err, req, res, next);
});

app.listen(PORT, () => {
});

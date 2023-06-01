import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import * as UserController from './controllers/UserController.js';
import checkAuth from './utils/checkAuth.js';
import { registerValidation } from './validations/auth.js';

dotenv.config();
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT;

mongoose
  .connect(mongodbUri)
  .then(() => {
    console.log('DB connected');
  })
  .catch((e) => console.log(e));

const app = express();

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileName = uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/register', upload.single('avatar'), registerValidation, UserController.register);

app.post('/auth/login', UserController.login);

app.get('/account', checkAuth, UserController.getMe);

app.get('/users', checkAuth, UserController.getUsers);

app.patch('/account/:id', upload.single('avatar'), UserController.editMe);

app.listen(3013, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('It works');
});

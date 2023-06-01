import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import UserModel from '../models/User.js';
import { instance } from './helpers.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const birthDate = new Date(req.body.birthDate);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.file?.filename,
      passwordHasch: hash,
      isMale: req.body.isMale,
      birthDate: birthDate,
    });

    const user = await doc.save();

    const { passwordHasch, ...userData } = user._doc;
    res.json({
      ...userData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to register',
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Registration failed',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHasch);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Uncorrect login or password',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHasch, ...userData } = user._doc;
    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({
      ...userData,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to log in',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    const { passwordHasch, avatarUrl, ...userData } = user._doc;

    let imageUrl = '';
    if (avatarUrl) {
      imageUrl = `${instance}/${avatarUrl.toString()}`;
    }

    res.json({ ...userData, avatarUrl: imageUrl });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to get the user',
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    const userData = users.map((user) => {
      const { avatarUrl, ...userData } = user._doc;
      let imageUrl = '';
      if (avatarUrl) {
        imageUrl = `${instance}/${avatarUrl.toString()}`;
      }
      return { ...userData, avatarUrl: imageUrl };
    });

    res.json(userData);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to get users',
    });
  }
};

export const editMe = async (req, res) => {
  try {
    const password = req.body.password;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const newHash = await bcrypt.hash(password, salt);

    const updateFields = {};

    if (req.body.fullName) {
      updateFields.fullName = req.body.fullName;
    }

    if (req.file && req.file.filename) {
      const currentUser = await UserModel.findOne({ _id: req.params.id });
      if (currentUser.avatarUrl) {
        const filePath = path.join('uploads', currentUser.avatarUrl.toString());
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      updateFields.avatarUrl = req.file.filename;
    }

    if (req.body.password) {
      updateFields.passwordHasch = newHash;
    }

    await UserModel.updateOne({ _id: req.params.id }, updateFields);

    res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to update data',
    });
  }
};

const express = require('express');
        const router = express.Router();
        const { Room } = require('../models');

        router.get('/', async (req, res) => {
          const rooms = await Room.findAll();
          res.json(rooms);
        });

        router.post('/', async (req, res) => {
          const room = await Room.create(req.body);
          res.json(room);
        });

        module.exports = router;

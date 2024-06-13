const express = require('express');
        const router = express.Router();
        const { Reservation } = require('../models');

        router.get('/', async (req, res) => {
          const reservations = await Reservation.findAll();
          res.json(reservations);
        });

        router.post('/', async (req, res) => {
          const reservation = await Reservation.create(req.body);
          res.json(reservation);
        });

        module.exports = router;
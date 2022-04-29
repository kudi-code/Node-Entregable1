const express = require('express');

//controllers
const {
  getAllPendings,
  getPendingById,
  createPending,
  completePending,
  cancellPending
} = require('../controllers/repairs.controller');

//router
const router = express.Router();

//Functions
router.route(`/`)
    .get( getAllPendings)
    .post( createPending);

router.route(`/:id`)
    .get(getPendingById)
    .patch(completePending)
    .delete(cancellPending);

//export default router es igual a:
module.exports = { repairsRouter: router };

const { Repair } = require('../models/repairs.model');

const getAllPendings = async (req, res) => {
    try {
        const repairs = await Repair.findOne({ where: { status: 'pending' } });
        res.status(201).json({
            repairs,
        });
    } catch (error) {
        console.log(error);
    }
};

const getPendingById = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await Repair.findOne({ where: { id } });
        if (!repair) {
            return res.status(400).json({
                status: 'error',
                message: 'repair not found given this ID',
            });
        }
        //Si está cancelado
        if (repair.status === 'cancelled') {
            return res.status(400).json({
                status: 'error',
                message: 'This repair has been deleted',
            });
        }

        res.status(201).json({
            repair,
        });
    } catch (error) {
        console.log(error);
    }
};

const createPending = async (req, res) => {
    try {
        const { date, userId } = req.body;
        const newRepair = await Repair.create({ date, userId });

        //Obtiene la nueva lista de repairs y lo envía como respuesta
        const repairs = await Repair.findOne({ where: { status: 'pending' } });

        res.status(201).json({
            status: 'Done!',
            repairs,
        });
    } catch (error) {
        console.log(error);
    }
};

const completePending = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await Repair.findOne({ where: { id } });
        if (!repair) {
            return res.status(400).json({
                status: 'error',
                message: 'Repair not found given this ID',
            });
        }

        //Si está cancelado
        if (repair.status === 'cancelled') {
            return res.status(400).json({
                status: 'error',
                message: 'This repair has been deleted',
            });
        }
        repair.update({ status: 'completed' });
        res.status(201).json({
            status: 'Done!',
        });
    } catch (error) {
        console.log(error);
    }
};

const cancellPending = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await Repair.findOne({ where: { id } });
        if (!repair) {
            return res.status(400).json({
                status: 'error',
                message: 'Repair no exist',
            });
        }

        //Si está cancelado
        if (repair.status === 'cancelled') {
            return res.status(400).json({
                status: 'error',
                message: 'This repair has been deleted',
            });
        }

        repair.update({ status: 'cancelled' });
        res.status(201).json({
            status: 'Repair deleted sucessfully',
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllPendings,
    getPendingById,
    createPending,
    completePending,
    cancellPending,
};

import express from 'express';
import { User, Room, Message } from './../db/models';
import { pagingDefault, errors, underscoreId } from "../global";
// hãy nhớ cái đoạn này
const roomsController = express.Router();

roomsController.get('/', async (req, res) => {
    const { query } = req;
    const skip = query.skip || pagingDefault.skip;
    const limit = query.limit || pagingDefault.limit;
    const { userId } = query;
    let queryMongoose = {};
    if (userId) {
        queryMongoose = {
            members: userId,
        };
    }
    try {
        const total = await Room.count(queryMongoose);
        const rooms = await Room
            .find(queryMongoose)
            .skip(skip)
            .limit(limit);
        res.status(200).json({
            skip,
            limit,
            total,
            data: rooms,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: errors.GeneralError.message,
        })
    }
});

roomsController.get('/:id', async (req, res) => {
    const roomId = req.params.id;
    const promises = [];
    const promise1 = Room.findById(roomId).lean().exec();
    const promise2 = Message.find({ room: roomId }).lean().exec();
    promises.push(promise1);
    promises.push(promise2);

    try {
        const room = await Room.findById(roomId).lean().exec();
        if (room) {
            //find message sentTo Room
            const messages = await Message.find({ room: room[underscoreId] }).lean().exec();
            room.message = messages;
            res.status(200).json(room);

            // call in parallel
            // const promise = [];
            // const promise1 = Rom.findById(roomId).lean().exec();
            // const
            // Promise.all()

        } else {
            res.status(404).json(room);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: errors.GeneralError.message,
            error,
        });
    }
});

roomsController.post('/', async(req, res) => {
    const room = req.body;
    console.log(room);
    if(!room) {
        res.status(400).json({
            code: 400,
            message: errors.BadRequest.message
        });
    } else {
        try {
            const roomToSave = new Room(room);
            const result = await roomToSave.save();
            res.status(200).json(result);
        } catch(error) {

        }
    }
})

export default roomsController;
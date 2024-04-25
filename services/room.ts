
import { AppError } from '../class/AppError';
import { Room, RoomInterface } from '../interfaces/Room';
import { sqlQuery } from '../util/queries';
import { findAllRoomsQuery, findOneRoomQuery } from '../util/queryArgs';

export const fetchAllRooms = async (): Promise<RoomInterface[]> => {
    const rooms = await sqlQuery(findAllRoomsQuery);
    return rooms;
    // const rooms = await Room.find();
    // if (rooms === null) {
    //     throw new AppError({ status: 404, message: "Rooms not found" });
    // }
    // return rooms;
}

export const fetchSingleRoom = async (id: any): Promise<RoomInterface | null> => {
    const room = await sqlQuery(findOneRoomQuery, [id]);
    return room;
    // const room = await Room.findById(id);
    // if (room === null) {
    //     throw new AppError({ status: 404, message: "Room not found" });
    // }
    // return room;
}

export const createRoom = async (data: RoomInterface): Promise<RoomInterface> => {
    const createRoom = await sqlQuery(
        `INSERT INTO room
            (room_type,room_number,description,offer,room_floor,rate,discount,status)
            VALUES 
        `, [
        data.room_type,
        data.room_number,
        data.description,
        data.offer,
        data.room_floor,
        Number(data.rate),
        Number(data.discount),
        data.status
    ]);

    return createRoom;
    // const room = await Room.create(data);
    // if (room === null) {
    //     throw new AppError({ status: 404, message: "Room couldn't be created" });
    // }

    // return room;
}

export const editRoom = async (id: any, data: RoomInterface): Promise<RoomInterface | null> => {
    const room = await Room.findByIdAndUpdate(id, data, { new: true });
    if (room === null) {
        throw new AppError({ status: 404, message: "Room not found" });
    }
    return room;

}

export const deleteRoom = async (id: any): Promise<RoomInterface | null> => {
    const room = await Room.findByIdAndDelete(id);
    if (room === null) {
        throw new AppError({ status: 404, message: "Room not found" });
    }
    return room;
}


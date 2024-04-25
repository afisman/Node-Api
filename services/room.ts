
import { AppError } from '../class/AppError';
import { Room, RoomInterface } from '../interfaces/Room';
import { sqlQuery } from '../util/queries';
import { findAllRoomsQuery, findOneRoomQuery } from '../util/queryArgs';

export const fetchAllRooms = async (): Promise<RoomInterface[]> => {
    console.log('In rooms')
    const rooms = await sqlQuery(findAllRoomsQuery)
    console.log(rooms);
    return rooms;
    // const rooms = await Room.find();
    // if (rooms === null) {
    //     throw new AppError({ status: 404, message: "Rooms not found" });
    // }
    // return rooms;
}

export const fetchSingleRoom = async (id: any): Promise<RoomInterface | null> => {
    const room = await sqlQuery(findOneRoomQuery, [id]);
    console.log(room);
    return room;
    // const room = await Room.findById(id);
    // if (room === null) {
    //     throw new AppError({ status: 404, message: "Room not found" });
    // }
    // return room;
}

export const createRoom = async (data: RoomInterface): Promise<RoomInterface> => {
    const room = await Room.create(data);
    if (room === null) {
        throw new AppError({ status: 404, message: "Room couldn't be created" });
    }

    return room;
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


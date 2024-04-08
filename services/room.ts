import { readJson, writeJson } from '../util/dataJson';
import { roomFile } from '../util/fileNames';
import { Room, RoomInterface } from '../interfaces/Room';


export const fetchAllRooms = async (): Promise<RoomInterface[]> => {
    return await Room.find();
}

export const fetchSingleRoom = async (id: any): Promise<RoomInterface | null> => {
    return await Room.findById(id);
}

export const createRoom = async (data: RoomInterface): Promise<RoomInterface> => {
    const newRoom = new Room(data);
    return await newRoom.save();
}

export const editRoom = async (id: any, data: RoomInterface): Promise<RoomInterface | null> => {
    return await Room.findByIdAndUpdate(id, data, { new: true });
}

export const deleteRoom = async (id: any): Promise<RoomInterface | null> => {
    return await Room.findByIdAndDelete(id).lean();
}


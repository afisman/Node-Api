
import { AppError } from '../class/AppError';
import { Room, RoomInterface } from '../interfaces/Room';

export const fetchAllRooms = async (): Promise<RoomInterface[]> => {
    try {
        return await Room.find();
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const fetchSingleRoom = async (id: any): Promise<RoomInterface | null> => {
    try {
        return await Room.findById(id);
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const createRoom = async (data: RoomInterface): Promise<RoomInterface> => {
    try {
        const newRoom = new Room(data);
        return await newRoom.save();
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const editRoom = async (id: any, data: RoomInterface): Promise<RoomInterface | null> => {
    try {
        return await Room.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const deleteRoom = async (id: any): Promise<RoomInterface | null> => {
    try {
        return await Room.findByIdAndDelete(id);
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}


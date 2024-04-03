import { readJson, writeJson } from '../util/dataJson';
import { roomFile } from '../util/fileNames';
import { Room } from '../interfaces/Room';

const roomData = readJson(roomFile) as Room[];

export const fetchAllRooms = (): Room[] => {
    return roomData;
}

export const fetchSingleRoom = (id: number): Room => {
    const singleRoom = roomData.find(room => room.id === id) || {} as Room;
    return singleRoom;
}

export const createRoom = (data: Room): string => {
    const roomExists = roomData.findIndex(room => room.id === data.id);
    if (data !== undefined && roomExists === -1) {
        roomData.push(data);
        writeJson(roomFile, roomData);
        return "Room created correctly";
    }

    return "Error creating room";
}

export const editRoom = (id: number, data: Room): string => {
    const roomExists = roomData.findIndex(room => room.id === id);
    if (data !== undefined && roomExists !== -1) {
        roomData[roomExists] = { ...roomData[roomExists], ...data };
        writeJson(roomFile, roomData);
        return "Room edited correctly";
    }

    return "Error editing room";
}

export const deleteRoom = (id: number): string => {
    const roomExists = roomData.findIndex(room => room.id === id);
    if (roomExists !== -1) {
        roomData.splice(roomExists, 1);
        writeJson(roomFile, roomData);
        return "Room deleted correctly";
    }

    return "Error deleted room";
}


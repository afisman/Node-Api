
import { AppError } from '../class/AppError';
import { Room, RoomInterface } from '../interfaces/Room';
import { sqlQuery } from '../util/queries';

export const fetchAllRooms = async (): Promise<RoomInterface[]> => {
    const rooms = await sqlQuery(`
        SELECT
            room._id,
            room.room_type,
            room.room_number,
            room.description,
            room.offer,
            room.room_floor,
            room.rate,
            room.discount,
            room.status,
            COALESCE(amenities.amenities, '[]') AS amenities,
            COALESCE(photos.photos, '[]') AS photos
            FROM room
		LEFT JOIN (
        SELECT
            room_amenity.room_id,
            JSON_ARRAYAGG(amenity.name) AS amenities
        FROM room_amenity
        LEFT JOIN amenity ON amenity._id = room_amenity.amenity_id
            GROUP BY room_amenity.room_id
            ) AS amenities ON amenities.room_id = room._id
        LEFT JOIN (
            SELECT photo.room_id,
                JSON_ARRAYAGG(photo.url) AS photos
            FROM photo
            GROUP BY photo.room_id
        ) AS photos ON photos.room_id = room._id;`);
    return rooms;
    // const rooms = await Room.find();
    // if (rooms === null) {
    //     throw new AppError({ status: 404, message: "Rooms not found" });
    // }
    // return rooms;
}

export const fetchSingleRoom = async (id: any): Promise<RoomInterface | null> => {
    const room = await sqlQuery(`
        SELECT
            room._id,
            room.room_type,
            room.room_number,
            room.description,
            room.offer,
            room.room_floor,
            room.rate,
            room.discount,
            room.status,
            COALESCE(amenities.amenities, '[]') AS amenities,
            COALESCE(photos.photos, '[]') AS photos
            FROM room
		LEFT JOIN (
        SELECT
            room_amenity.room_id,
            JSON_ARRAYAGG(amenity.name) AS amenities
        FROM room_amenity
        LEFT JOIN amenity ON amenity._id = room_amenity.amenity_id
            GROUP BY room_amenity.room_id
            ) AS amenities ON amenities.room_id = room._id
        LEFT JOIN (
            SELECT photo.room_id,
                JSON_ARRAYAGG(photo.url) AS photos
            FROM photo
            GROUP BY photo.room_id
        ) AS photos ON photos.room_id = room._id
        WHERE room._id = ?
        ;`, [id]);
    return room;
    // const room = await Room.findById(id);
    // if (room === null) {
    //     throw new AppError({ status: 404, message: "Room not found" });
    // }
    // return room;
}

export const createRoom = async (data: RoomInterface): Promise<RoomInterface> => {
    console.log(data)
    const createRoom = await sqlQuery(
        `INSERT INTO room
            (room_type,room_number,description,offer,room_floor,rate,discount,status)
            VALUES (?,?,?,?,?,?,?,?)
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

    const roomId = createRoom.insertId;

    const amenities: any[] = await sqlQuery("SELECT * FROM amenity");
    let amenitiesQuery = `INSERT INTO room_amenity (room_id, amenity_id) VALUES  `
    const amenitiesFromForm = data.amenities;
    for (let i = 0; i < amenitiesFromForm.length; i++) {
        let amId = amenities.find(amenity => amenity.name === amenitiesFromForm[i])._id;
        if (i !== amenitiesFromForm.length - 1) {
            amenitiesQuery += `("${roomId}", "${amId}"), \n`;
        } else {
            amenitiesQuery += `("${roomId}", "${amId}"); \n`;
        }
    }
    const addAmenities = await sqlQuery(amenitiesQuery);

    const photosFromForm = data.photos;
    let photoQuery = `INSERT INTO photo (url, room_id) VALUES `;

    for (let i = 0; i < photosFromForm.length; i++) {
        if (i !== photosFromForm.length - 1) {
            photoQuery += `("${photosFromForm[i]}", "${roomId}"), \n`;
        } else {
            photoQuery += `("${photosFromForm[i]}", "${roomId}"); \n`;
        }
    }

    const addPhotos = await sqlQuery(photoQuery);


    return createRoom;
    // const room = await Room.create(data);
    // if (room === null) {
    //     throw new AppError({ status: 404, message: "Room couldn't be created" });
    // }

    // return room;
}

export const editRoom = async (id: any, data: RoomInterface): Promise<RoomInterface | null> => {
    const keys: string[] = [];
    const values: any[] = [];

    for (let property in data) {
        if (property !== 'amenities' && property !== 'photos') { keys.push(property); }
        if (property === 'discount' || property === 'rate') {
            values.push(Number(data[property]));
        } else if (property !== 'amenities' && property !== 'photos') {
            values.push(data[property as keyof RoomInterface]);
        }
    }
    const updateColumn: string = keys
        .map((key: string) => `${key} = ?`)
        .join(", ");

    const updateRoom = await sqlQuery(
        `
    UPDATE room
    set ${updateColumn}
    WHERE _id=?
    `,
        [...values, id]
    );


    const deletePhotosFromRoom = await sqlQuery(`
        DELETE FROM photo
        WHERE room_id = ?
    `, [id]);

    const photosFromForm = data.photos;
    let photoQuery = `INSERT INTO photo (url, room_id) VALUES `;

    for (let i = 0; i < photosFromForm.length; i++) {
        if (i !== photosFromForm.length - 1) {
            photoQuery += `("${photosFromForm[i]}", "${id}"), \n`;
        } else {
            photoQuery += `("${photosFromForm[i]}", "${id}"); \n`;
        }
    }


    const addPhotos = await sqlQuery(photoQuery);

    const deleteAmenitiesFromRoom = await sqlQuery(`
    DELETE FROM room_amenity
    WHERE room_id = ?
    `, [id]);


    const amenities: any[] = await sqlQuery("SELECT * FROM amenity");
    let amenitiesQuery = `INSERT INTO room_amenity (room_id, amenity_id) VALUES  `
    const amenitiesFromForm = data.amenities;
    for (let i = 0; i < amenitiesFromForm.length; i++) {
        let amId = amenities.find(amenity => amenity.name === amenitiesFromForm[i])._id;
        if (i !== amenitiesFromForm.length - 1) {
            amenitiesQuery += `("${id}", "${amId}"), \n`;
        } else {
            amenitiesQuery += `("${id}", "${amId}"); \n`;
        }
    }

    const addAmenities = await sqlQuery(amenitiesQuery);

    return updateRoom;

    // const room = await Room.findByIdAndUpdate(id, data, { new: true });
    // if (room === null) {
    //     throw new AppError({ status: 404, message: "Room not found" });
    // }
    // return room;

}

export const deleteRoom = async (id: any): Promise<RoomInterface | null> => {
    const room = await sqlQuery(`
    DELETE FROM room
    WHERE _id = ?
    `, [id]);
    return room;
    // const room = await Room.findByIdAndDelete(id);
    // if (room === null) {
    //     throw new AppError({ status: 404, message: "Room not found" });
    // }
    // return room;
}


import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import { fetchSingleContact } from '../services/contact';
import { fetchSingleRoom } from '../services/room';
import { fetchSingleBooking } from '../services/booking';



const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsZWZ0YXUiLCJpYXQiOjE3MTIwNzEyNjksImV4cCI6MTcyMDcxMTI2OX0.vDPJQB-ich5_n9B_tewv4ViWlOg_FeI-duod39aVPws";
const malformedJWT = 'Hello world'



describe('Tests for bookings', () => {
    const idToUse = "661689a37b25bedbacae6a79";
    const bookingToUse = {
        "_id": "661689a37b25bedbacae6a79",
        "name": "Mr. Rodney Stamm",
        "order_date": "Fri Aug 25 2023 06:46:11 GMT+0200 (hora de verano de Europa central)",
        "check_in": "1734806261179",
        "hour_check_in": "13:26:29",
        "check_out": "1735841208989",
        "hour_check_out": "20:31:51",
        "rate": "5626",
        "room": "661689a27b25bedbacae6a61",
        "special_request": "Tamdiu deficio arcesso tam. Adulescens vinco bos abeo arceo adiuvo quisquam repellendus talis suadeo. Harum curriculum amita usus minima debeo.",
        "status": "Check In"
    }
    it('should try to create booking with no token', async () => {

        const res = await request(app)
            .post('/bookings')
            .send(bookingToUse)
        expect(res.statusCode).toEqual(401);
    })
    it('should try to create booking with malformed token', async () => {
        const res = await request(app)
            .post(`/bookings`)
            .set({ authorization: malformedJWT })
            .send(bookingToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to edit booking with no token', async () => {
        const res = await request(app)
            .put(`/bookings/${idToUse}`)
            .send(bookingToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to edit booking with malformed token', async () => {
        const res = await request(app)
            .put(`/bookings/${idToUse}`)
            .set({ authorization: malformedJWT })
            .send(bookingToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete booking with no token', async () => {
        const res = await request(app)
            .delete(`/bookings/${idToUse}`)
            .send(idToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to delete booking with malformed token', async () => {
        const res = await request(app)
            .delete(`/bookings/${idToUse}`)
            .set({ authorization: malformedJWT })
            .send(idToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete booking with correct token', async () => {
        const res = await request(app)
            .delete(`/bookings/${idToUse}`)
            .set({ authorization: authToken })
            .send(idToUse)
        expect(res.statusCode).toEqual(200)
    })
    it('should try to create booking with correct token', async () => {
        const res = await request(app)
            .post(`/bookings`)
            .set({ authorization: authToken })
            .send(bookingToUse)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject(fetchSingleBooking(idToUse))
    })
    it('should try to edit booking with correct token', async () => {
        const res = await request(app)
            .put(`/bookings/${idToUse}`)
            .set({ authorization: authToken })
            .send({ ...bookingToUse, name: "Rodney Stamm" })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject(fetchSingleBooking(idToUse))
    })
})


describe('Tests for rooms', () => {
    const idToUse = "661689a27b25bedbacae6a59";
    const roomToUse = {
        "_id": "661689a27b25bedbacae6a59",
        "photos": [
            "https://loremflickr.com/640/480/hotel,bedroom?lock=592028048031744",
            "https://loremflickr.com/640/480/hotel,bedroom?lock=8087388192505856",
            "https://loremflickr.com/640/480/hotel,bedroom?lock=2461302163243008"
        ],
        "room_type": "Double Room",
        "room_number": "volutabrum-418",
        "description": "Xiphias vesper ascit villa. Audentia tres curo utroque brevis harum venio quaerat.",
        "offer": "Yes",
        "room_floor": "9",
        "rate": 30782,
        "discount": "0",
        "amenities": [
            "Kitchen",
            "Smart Security",
            "Room Service",
            "Locker",
            "Single Bed",
            "Towels",
            "Cleaning",
            "Air Conditioner",
            "High Speed Wifi",
            "Shower",
            "Terrace",
            "Shop Near",
            "Breakfast"
        ],
        "status": "Available",
    }
    it('should try to create room with no token', async () => {

        const res = await request(app)
            .post('/rooms')
            .send(roomToUse)
        expect(res.statusCode).toEqual(401);
    })
    it('should try to create room with malformed token', async () => {
        const res = await request(app)
            .post(`/rooms`)
            .set({ authorization: malformedJWT })
            .send(roomToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to edit room with no token', async () => {
        const res = await request(app)
            .put(`/rooms/${idToUse}`)
            .send(roomToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to edit room with malformed token', async () => {
        const res = await request(app)
            .put(`/rooms/${idToUse}`)
            .set({ authorization: malformedJWT })
            .send(roomToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete room with no token', async () => {
        const res = await request(app)
            .delete(`/rooms/${idToUse}`)
            .send(idToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to delete room with malformed token', async () => {
        const res = await request(app)
            .delete(`/rooms/${idToUse}`)
            .set({ authorization: malformedJWT })
            .send(idToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete room with correct token', async () => {
        const res = await request(app)
            .delete(`/rooms/${idToUse}`)
            .set({ authorization: authToken })
            .send(idToUse)
        expect(res.statusCode).toEqual(200)
    })
    it('should try to create room with correct token', async () => {

        const res = await request(app)
            .post(`/rooms`)
            .set({ authorization: authToken })
            .send(roomToUse)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject(fetchSingleRoom(idToUse))
    })
    it('should try to edit room with correct token', async () => {
        const editedData = { ...roomToUse, room_floor: "22" }
        const res = await request(app)
            .put(`/rooms/${idToUse}`)
            .set({ authorization: authToken })
            .send(editedData)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject(fetchSingleRoom(idToUse))
    })
})

describe('Tests for contact', () => {
    const idToUse = "661689a77b25bedbacae6ab7";
    const contactToUse = {
        "_id": "661689a77b25bedbacae6ab7",
        "image": "https://avatars.githubusercontent.com/u/54915277",
        "full_name": "Shawna Hansen",
        "email": "Trinity_McCullough@gmail.com",
        "phone": "289.898.3514 x851",
        "date": "Sat Mar 23 2024 10:49:40 GMT+0100 (hora estándar de Europa central)",
        "message": "Cogito defleo aspicio. Tibi tantillus fuga. Color ipsa pel ulciscor.\nAudio cultellus thermae fuga surgo decipio impedit arcus vapulus. Sursum taedium demonstro turpis totidem varius deprimo viridis amoveo vicissitudo. Audeo virgo thermae perspiciatis pauci clarus cumque neque commodo.",
        "rating": 4,
        "read": false,
        "createdAt": "2024-04-10T12:44:23.204Z",
        "updatedAt": "2024-04-10T12:44:23.204Z",
        "__v": 0
    }
    it('should try to create contact with no token', async () => {

        const res = await request(app)
            .post('/contact')
            .send(contactToUse)
        expect(res.statusCode).toEqual(401);
    })
    it('should try to create contact with malformed token', async () => {
        const res = await request(app)
            .post(`/contact`)
            .set({ authorization: malformedJWT })
            .send(contactToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to edit contact with no token', async () => {
        const res = await request(app)
            .put(`/contact/${idToUse}`)
            .send(contactToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to edit contact with malformed token', async () => {
        const res = await request(app)
            .put(`/contact/${idToUse}`)
            .set({ authorization: malformedJWT })
            .send(contactToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete contact with no token', async () => {
        const res = await request(app)
            .delete(`/contact/${idToUse}`)
            .send(idToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to delete contact with malformed token', async () => {
        const res = await request(app)
            .delete(`/contact/${idToUse}`)
            .set({ authorization: malformedJWT })
            .send(idToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete contact with correct token', async () => {
        const res = await request(app)
            .delete(`/contact/${idToUse}`)
            .set({ authorization: authToken })
            .send(idToUse)
        expect(res.statusCode).toEqual(200)
    })
    it('should try to create contact with correct token', async () => {

        const res = await request(app)
            .post(`/contact`)
            .set({ authorization: authToken })
            .send(contactToUse)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject(fetchSingleContact(idToUse))
    })
    it('should try to edit contact with correct token', async () => {
        const editedData = { ...contactToUse, message: "I have changed the message" }
        const res = await request(app)
            .put(`/contact/${idToUse}`)
            .set({ authorization: authToken })
            .send(editedData)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject(fetchSingleContact(idToUse))
    })
})

afterAll(() => mongoose.connection.close())








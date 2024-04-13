import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import { Booking } from '../interfaces/Booking';
import { Room } from '../interfaces/Room';
import { Contact } from '../interfaces/Contact';
import { bookingIdToUse, bookingToUse, contactIdToUse, contactToUse, roomIdToUse, roomToUse } from './testConstants';

const dotenv = require('dotenv');
dotenv.config();

const authToken = process.env.AUTH;
const malformedJWT = 'Hello world';




describe('Tests for bookings', () => {
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
            .put(`/bookings/${bookingIdToUse}`)
            .send(bookingToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to edit booking with malformed token', async () => {
        const res = await request(app)
            .put(`/bookings/${bookingIdToUse}`)
            .set({ authorization: malformedJWT })
            .send(bookingToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete booking with no token', async () => {
        const res = await request(app)
            .delete(`/bookings/${bookingIdToUse}`)
            .send(bookingIdToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to delete booking with malformed token', async () => {
        const res = await request(app)
            .delete(`/bookings/${bookingIdToUse}`)
            .set({ authorization: malformedJWT })
            .send(bookingIdToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete booking with correct token', async () => {
        const res = await request(app)
            .delete(`/bookings/${bookingIdToUse}`)
            .set({ authorization: authToken })
            .send(bookingIdToUse)
        expect(res.statusCode).toEqual(200)
    })
    it('should try to create booking with correct token', async () => {
        const res = await request(app)
            .post(`/bookings`)
            .set({ authorization: authToken })
            .send(bookingToUse)
        expect(res.statusCode).toEqual(200)
        const singleBooking = await Booking.findById(bookingIdToUse)
        //expect(res.body).toMatchObject(structuredClone(singleBooking) as BookingInterface)
        expect(res.body).toMatchObject(JSON.parse(JSON.stringify(singleBooking)))

    })
    it('should try to edit booking with correct token', async () => {
        const res = await request(app)
            .put(`/bookings/${bookingIdToUse}`)
            .set({ authorization: authToken })
            .send({ ...bookingToUse, name: "Rodney Stamm" })
        expect(res.statusCode).toEqual(200)
        const singleBooking = await Booking.findById(bookingIdToUse).populate("room")
        // expect(res.body).toMatchObject(structuredClone(singleBooking) as BookingInterface)

        expect(res.body).toMatchObject(JSON.parse(JSON.stringify(singleBooking)))
    })
})


describe('Tests for rooms', () => {
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
            .put(`/rooms/${roomIdToUse}`)
            .send(roomToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to edit room with malformed token', async () => {
        const res = await request(app)
            .put(`/rooms/${roomIdToUse}`)
            .set({ authorization: malformedJWT })
            .send(roomToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete room with no token', async () => {
        const res = await request(app)
            .delete(`/rooms/${roomIdToUse}`)
            .send(roomIdToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to delete room with malformed token', async () => {
        const res = await request(app)
            .delete(`/rooms/${roomIdToUse}`)
            .set({ authorization: malformedJWT })
            .send(roomIdToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete room with correct token', async () => {
        const res = await request(app)
            .delete(`/rooms/${roomIdToUse}`)
            .set({ authorization: authToken })
            .send(roomIdToUse)
        expect(res.statusCode).toEqual(200)
    })
    it('should try to create room with correct token', async () => {
        const res = await request(app)
            .post(`/rooms`)
            .set({ authorization: authToken })
            .send(roomToUse)
        expect(res.statusCode).toEqual(200)
        const singleRoom = await Room.findById(roomIdToUse)
        // expect(res.body).toMatchObject(structuredClone(singleRoom) as any)

        expect(res.body).toMatchObject(JSON.parse(JSON.stringify(singleRoom)))
    })
    it('should try to edit room with correct token', async () => {
        const editedData = { ...roomToUse, room_floor: "22" }
        const res = await request(app)
            .put(`/rooms/${roomIdToUse}`)
            .set({ authorization: authToken })
            .send(editedData)
        expect(res.statusCode).toEqual(200)
        const singleRoom = await Room.findById(roomIdToUse)
        // expect(res.body).toMatchObject(structuredClone(singleRoom) as any)
        expect(res.body).toMatchObject(JSON.parse(JSON.stringify(singleRoom)))

    })
})

describe('Tests for contact', () => {
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
            .put(`/contact/${contactIdToUse}`)
            .send(contactToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to edit contact with malformed token', async () => {
        const res = await request(app)
            .put(`/contact/${contactIdToUse}`)
            .set({ authorization: malformedJWT })
            .send(contactToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete contact with no token', async () => {
        const res = await request(app)
            .delete(`/contact/${contactIdToUse}`)
            .send(contactIdToUse)
        expect(res.statusCode).toEqual(401)
    })
    it('should try to delete contact with malformed token', async () => {
        const res = await request(app)
            .delete(`/contact/${contactIdToUse}`)
            .set({ authorization: malformedJWT })
            .send(contactIdToUse)
        expect(res.statusCode).toEqual(403)
    })
    it('should try to delete contact with correct token', async () => {
        const res = await request(app)
            .delete(`/contact/${contactIdToUse}`)
            .set({ authorization: authToken })
            .send(contactIdToUse)
        expect(res.statusCode).toEqual(200)
    })
    it('should try to create contact with correct token', async () => {
        const res = await request(app)
            .post(`/contact`)
            .set({ authorization: authToken })
            .send(contactToUse)
        expect(res.statusCode).toEqual(200)
        const singleContact = await Contact.findById(contactIdToUse)
        // expect(res.body).toMatchObject(structuredClone(singleContact) as ContactInterface)
        expect(res.body).toMatchObject(JSON.parse(JSON.stringify(singleContact)))
    })
    it('should try to edit contact with correct token', async () => {
        const editedData = { ...contactToUse, message: "I have changed the message" }
        const res = await request(app)
            .put(`/contact/${contactIdToUse}`)
            .set({ authorization: authToken })
            .send(editedData)
        expect(res.statusCode).toEqual(200)
        const singleContact = await Contact.findById(contactIdToUse)
        //expect(res.body).toMatchObject(structuredClone(singleContact) as ContactInterface)
        expect(res.body).toMatchObject(JSON.parse(JSON.stringify(singleContact)))
    })
})

afterAll(async () => await mongoose.connection.close());







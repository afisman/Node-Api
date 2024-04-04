import request from 'supertest';
import { app } from '../app';

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsZWZ0YXUiLCJpYXQiOjE3MTIwNzEyNjksImV4cCI6MTcyMDcxMTI2OX0.vDPJQB-ich5_n9B_tewv4ViWlOg_FeI-duod39aVPws";
const malformedJWT = 'Hello world'

describe('Put Endpoints for bookings', () => {
    it('should try to edit booking with no token', async () => {
        const res = await request(app)
            .put('/bookings/edit/12')
            .send({
                name: 'test is cool',
            })
        expect(res.statusCode).toEqual(401)
    })
    it('should try to edit booking with malformed token', async () => {
        const res = await request(app)
            .put('/bookings/edit/12')
            .set({ authorization: malformedJWT })
            .send({
                name: 'test is cool',
            })
        expect(res.statusCode).toEqual(403)
    })
    it('should try to edit booking with correct token', async () => {
        const res = await request(app)
            .put('/bookings/edit/12')
            .set({ authorization: authToken })
            .send({
                name: 'test is cool',
            })
        expect(res.statusCode).toEqual(200)
    })
})

describe('Put Endpoints for users', () => {
    it('should try to edit user with no token', async () => {
        const res = await request(app)
            .put('/users/edit/12')
            .send({
                full_name: 'Thomas Muntz',
            })
        expect(res.statusCode).toEqual(401)
    })
    it('should try to edit user with malformed token', async () => {
        const res = await request(app)
            .put('/users/edit/12')
            .set({ authorization: malformedJWT })
            .send({
                full_name: 'Martin luther',
            })
        expect(res.statusCode).toEqual(403)
    })
    it('should try to edit user with correct token', async () => {
        const res = await request(app)
            .put('/users/edit/12')
            .set({ authorization: authToken })
            .send({
                full_name: 'Melchior Hoffman',
            })
        expect(res.statusCode).toEqual(200)
    })
})

describe('Put Endpoints for rooms', () => {
    it('should try to edit user with no token', async () => {
        const res = await request(app)
            .put('/rooms/edit/12')
            .send({
                description: 'Best room in hotel',
            })
        expect(res.statusCode).toEqual(401)
    })
    it('should try to edit user with malformed token', async () => {
        const res = await request(app)
            .put('/rooms/edit/12')
            .set({ authorization: malformedJWT })
            .send({
                description: 'Best room in hotel',
            })
        expect(res.statusCode).toEqual(403)
    })
    it('should try to edit user with correct token', async () => {
        const res = await request(app)
            .put('/rooms/edit/12')
            .set({ authorization: authToken })
            .send({
                description: 'Best room in hotel',
            })
        expect(res.statusCode).toEqual(200)
    })
})

describe('Get contacts endpoints', () => {
    it('should get contact data and show status 200', async () => {
        const res = await request(app)
            .get('/contact')
        expect(res.statusCode).toEqual(200)
    })
})




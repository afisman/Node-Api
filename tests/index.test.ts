import request from 'supertest';
import { app } from '../app';

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsZWZ0YXUiLCJpYXQiOjE3MTIwNzEyNjksImV4cCI6MTcyMDcxMTI2OX0.vDPJQB-ich5_n9B_tewv4ViWlOg_FeI-duod39aVPws";
const malformedJWT = 'Hello world'

describe('Post Endpoints', () => {
    it('shouldedit booking', async () => {
        const res = await request(app)
            .put('/bookings/edit/12')
            .send({
                name: 'test is cool',
            })
        expect(res.statusCode).toEqual(401)
    })
})

describe('Post Endpoints', () => {
    it('shouldedit booking', async () => {
        const res = await request(app)
            .put('/bookings/edit/12')
            .set({ authorization: malformedJWT })
            .send({
                name: 'test is cool',
            })
        expect(res.statusCode).toEqual(403)
    })
})
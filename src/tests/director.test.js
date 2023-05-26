const request = require('supertest');
const app = require('../app');
require('../models')

let directorId;

test('/POST  should create an director in /directors', async () => {
    const body = {
        firstName:"Peter",
        lastName:"Jackson",
        nationality:"Nueva Zelanda",
        image:"https://flxt.tmsimg.com/assets/154972_v9_bb.jpg",
        birthday:"1961-10-31"
        }
        const res = await request(app).post('/directors').send(body);
        directorId = res.body.id;
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
});

test('/GET ALL It should show all existing directors in /directors', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/PUT should update the body fields of an director by the /:id', async () => {
    const body = {
        firstName:"Steven",
        lastName:"Spielberg",
        nationality:"Estados Unidos",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Steven_Spielberg_by_Gage_Skidmore.jpg/270px-Steven_Spielberg_by_Gage_Skidmore.jpg",
        birthday:"1946-12-18"
    }
    const res = await request(app).put(`/directors/${directorId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.lastName).toBe(body.lastName);
    expect(res.body.nationality).toBe(body.nationality);
    expect(res.body.image).toBe(body.image);
    expect(res.body.birthday).toBe(body.birthday);
});

test('/DELETE should remove an director from /directors by the /:id', async () => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
});
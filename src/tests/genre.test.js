const request = require('supertest');
const app = require('../app');
require('../models')

let genreId;

test('/POST should create an genre in /genres', async () => {
    const body = {
        name:"Aventuras"
    }
    const res = await request(app).post('/genres').send(body);
    genreId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('/GET ALL It should show all existing genres in /genres', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/PUT should update the body fields of an genre by the /:id', async () => {
    const body = {
        name:"Terror"
    }
    const res = await request(app).put(`/genres/${genreId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('/DELETE should remove an genre from genres by the /:id ', async () => {
    const res = await request(app).delete(`/genres/${genreId}`);
    expect(res.status).toBe(204);
});
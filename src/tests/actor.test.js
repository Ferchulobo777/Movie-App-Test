const request = require('supertest');
const app = require('../app');
require('../models')


let actorId;

test('/POST  should create an actor in /actors', async () => {
    const body = {
            firstName:"Carrie-Anne",
            lastName:"Moss",
            nationality:"Canada",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Carrie-Anne_Moss_May_2016.jpg/427px-Carrie-Anne_Moss_May_2016.jpg",
            birthday:"1967-08-21"
    }
    const res = await request(app).post('/actors').send(body);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});
test('/GET ALL It should show all existing actors in /actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test('/PUT should update the body fields of an actor by the /:id', async () => {
    const body = {
        firstName:"Keanu",
        lastName:"Reeves",
        nationality:"Canada",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Reuni%C3%A3o_com_o_ator_norte-americano_Keanu_Reeves_%2846806576944%29_%28cropped%29.jpg/220px-Reuni%C3%A3o_com_o_ator_norte-americano_Keanu_Reeves_%2846806576944%29_%28cropped%29.jpg",
        birthday:"1964-09-02"
    }
    const res = await request(app).put(`/actors/${actorId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.lastName).toBe(body.lastName);
    expect(res.body.nationality).toBe(body.nationality);
    expect(res.body.image).toBe(body.image);
    expect(res.body.birthday).toBe(body.birthday);
});


test('/DELETE should remove an actor from actors by the /:id', async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
});
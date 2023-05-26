const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')


let movieId;

test('/POST  should create an movie in /movies', async () => {
    const body = {
        name:"The Matrix Resurrections",
        image:"https://m.media-amazon.com/images/M/MV5BMGJkNDJlZWUtOGM1Ny00YjNkLThiM2QtY2ZjMzQxMTIxNWNmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
        synopsis:"Neo vive una vida normal y corriente en San Francisco mientras su terapeuta le prescribe pastillas azules. Hasta que Morfeo le ofrece la pastilla roja y vuelve a abrir su mente al mundo de Matrix.",
        releaseYear:2021
    }
    const res = await request(app).post('/movies').send(body);
    movieId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('/POST should set the actors who play or participate in that movie', async () => {
    const actor = await Actor.create({
            firstName:"Carrie-Anne",
            lastName:"Moss",
            nationality:"Canada",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Carrie-Anne_Moss_May_2016.jpg/427px-Carrie-Anne_Moss_May_2016.jpg",
            birthday:"1967-08-21"
    })
    const res = await request(app).post(`/movies/${movieId}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

});

test('/POST should set the directors who direct or participate in that movie', async () => {
    const director = await Director.create({
            firstName: "Director",
            lastName: "Name",
            nationality: "Country",
            image: "https://example.com/director-image.jpg",
            birthday: "1990-01-01"
    });
    const res = await request(app).post(`/movies/${movieId}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/POST should set the genres to which that movie belongs', async () => {
    const genre = await Genre.create({
        name: "Action"
    });
    const res = await request(app).post(`/movies/${movieId}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/GET ALL It should show all existing movies in /movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].actors).toBeDefined();
    expect(res.body[0].directors).toBeDefined();
    expect(res.body[0].genres).toBeDefined();
});

test('/PUT should update the body fields of an movie by the /:id', async () => {
    const body = {
        name:"Jurasic Park",
        image:"https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg",
        synopsis:"Gracias al ADN fosilizado en ámbar, John Hammond da vida a varias especies de dinosaurios y crea Jurassic Park, un parque temático en una isla de Costa Rica. Pero lo que parecía un sueño se convierte rápidamente en pesadilla.",
        releaseYear:1993
    }
    const res = await request(app).put(`/movies/${movieId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
    expect(res.body.image).toBe(body.image);
    expect(res.body.synopsis).toBe(body.synopsis);
    expect(res.body.releaseYear).toBe(body.releaseYear);
});


test('/DELETE should remove an movie from /movies by the /:id', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});
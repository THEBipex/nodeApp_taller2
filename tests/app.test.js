const request = require('supertest');
const app = require('../src/app');

describe('Pruebas de API Node.js', () => {
    
    // Prueba endpoint raiz
    it('Debe devolver estado 200 en /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toContain("API Node.js Funcionando");
    });

    // Prueba endpoint visitas (Mockeado logicamente en app.js)
    it('Debe devolver numero de visitas', async () => {
        const res = await request(app).get('/visitas');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('visitas');
    });

    // Prueba logica de negocio (Calculo Par)
    it('Debe detectar numero Par', async () => {
        const res = await request(app).post('/calculo').send({ numero: 10 });
        expect(res.body.tipo).toEqual("Par");
    });

    // Prueba logica de negocio (Calculo Impar)
    it('Debe detectar numero Impar', async () => {
        const res = await request(app).post('/calculo').send({ numero: 7 });
        expect(res.body.tipo).toEqual("Impar");
    });

    // Prueba manejo de errores
    it('Debe fallar si no envio numero', async () => {
        const res = await request(app).post('/calculo').send({});
        expect(res.statusCode).toEqual(400);
    });
});
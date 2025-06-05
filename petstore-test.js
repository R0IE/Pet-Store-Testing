const requests = require('supertest');

const baseUrl = 'https://petstore.swagger.io/v2';

describe('Petstore API', () => {
    let petId;

    it('should create a new pet', async () => {
        const response = await requests(baseUrl)
            .post('/pet')
            .send({
                id: 12345,
                name: 'doggie',
                photoUrls: [],
                status: 'available'
            })
            .expect(200);

        expect(response.body.id).toBe(12345);
        petId = response.body.id;
    });

    it('should get the pet by id', async () => {
        const response = await requests(baseUrl)
            .get(`/pet/${petId}`)
            .expect(200);

        expect(response.body.id).toBe(petId);
        expect(response.body.name).toBe('doggie');
    });

    it('should update pet status', async () => {
        const response = await requests(baseUrl)
            .put(`/pet`)
            .send({
                id: petId,
                name: 'doggie',
                photoUrls: [],
                status: 'sold'
            })
            .expect(200);
            expect(response.body.status).toBe('sold');
        });

    it('should delete the pet', async () => {
        await requests(baseUrl)
            .delete(`/pet/${petId}`)
            .expect(200);
    });

    it('should get the pet by id and verify it is deleted', async () => {
        await requests(baseUrl)
            .get(`/pet/${petId}`)
            .expect(404);
    });

    it('should return 404 for deleting the pet again', async () => {
        await requests(baseUrl)
            .delete(`/pet/${petId}`)
            .expect(404);
    });

    it('should return 404 for invalid pet id', async () => {
        await requests(baseUrl)
            .get(`/pet/invalid`)
            .expect(404);
    });
});
import supertest from 'supertest';
import app from '../app';

jest.mock('../Middleware/aouthentication_admin.middleware', () => (req: any, res: any, next: () => any) => next());

describe('PhotographyPackage routes', () => {
    let addedPhotographyPackageId: number;

    it('should add a new Photography Package', async () => {
        const res = await supertest(app).post('/PhotographyPackage').send({ id: 0, type: "Sari97414", moneyToHour: 20 });
        expect(res.status).toBe(200);
        addedPhotographyPackageId = res.body.id; 
    });

    it('should get all Photography Packages and check for the added package', async () => {
        const res = await supertest(app).get('/PhotographyPackage');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); 
        expect(res.body.length).toBeGreaterThan(0);

        const addedPackage = res.body.find((pkg: any) => pkg.id === addedPhotographyPackageId);
        expect(addedPackage).toBeDefined();
        expect(addedPackage.type).toBe("Sari97414");
        expect(addedPackage.moneyToHour).toBe(20);
    });


    it('should update a Photography Package', async () => {
        const res = await supertest(app).put(`/PhotographyPackage/${addedPhotographyPackageId}`).send({ id: addedPhotographyPackageId, type: "sari", moneyToHour: 20 });
        expect(res.status).toBe(200);
    });

    it('should handle invalid Money To Hour value when adding a Photography Package', async () => {
        const res = await supertest(app).post('/PhotographyPackage').send({ id: addedPhotographyPackageId, type: "Test", moneyToHour: -5 });
        expect(res.status).toBe(404);
        expect(res.text).toBe('Please enter a valid Money To Hour value.');
    });

    it('should handle invalid Money To Hour value when updating a Photography Package', async () => {
        const res = await supertest(app).put(`/PhotographyPackage/${addedPhotographyPackageId}`).send({ id: addedPhotographyPackageId, type: "Test", moneyToHour: -10 });
        expect(res.status).toBe(404);
        expect(res.text).toBe('Please enter a valid Money To Hour value.');
    });

    it('should delete a Photography Package', async () => {
        const res = await supertest(app).delete(`/PhotographyPackage/${addedPhotographyPackageId}`);
        expect(res.status).toBe(200);
    });

    it('should return 404 when trying to update a non-existing Photography Package', async () => {
        const res = await supertest(app).put(`/PhotographyPackage/${addedPhotographyPackageId}`).send({ id: addedPhotographyPackageId, type: "Test", moneyToHour: 30 });
        expect(res.status).toBe(404);
        expect(res.text).toBe('PhotographyPackage not found'); 
    });

    it('should return 404 when trying to delete a non-existing Photography Package', async () => {
        const res = await supertest(app).delete(`/PhotographyPackage/${addedPhotographyPackageId}`);
        expect(res.status).toBe(404);
        expect(res.text).toBe('PhotographyPackage not found'); 
    });
});

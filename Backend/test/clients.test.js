/* 
    Usuario base:
    {
        "name": "Juan Pérez", => Campo unico
        "cuit": "20-22345678-9", => Campo unico
        "email": "juan.perez1@example.com", => Campo unico
        "phone": "+54 9 11 1234-5678", => Campo opcional
        "address": "Av. Corrientes 1234, Buenos Aires, Argentina", => Campo opcional
        "balance": 15230.75, => Campo opcional, predeterminado en "0.00", acepta valor negativo
        "is_active": true => Campo opcional, predeterminado como true al crearse
    }
*/

// Desactiva la verificación de certificados SSL en caso tal
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const request = require("supertest");
require("dotenv").config();

const API_URL = process.env.API_URL;

// const validUser = {
//   email: 'testeradl@test.com',
//   password: 'Tester@2025',
// }

const users = {
  validUser: {
    email: "testeradl@test.com",
    password: "Tester@2025",
  },
  invalidUser: {
<<<<<<< HEAD
    email: "testeradl1@test.com",
    password: "Tester@2026",
  },
  emptyEmail: {
    email: "",
    password: "Tester@2025",
  },
  emptyPassword: {
    email: "testeradl@test.com",
    password: "",
  },
  emptyUser: {
    email: "",
    password: "",
  },
  invalidEmail: {
    email: "testtest.com",
    password: "Tester@2025",
=======
    email: 'testeradl1@test.com',
    password: 'Tester@2026',
  },
  emptyEmail: {
    email: '',
    password: 'Tester@2025',
  },
  emptyPassword: {
    email: 'testeradl@test.com',
    password: '',
  },
  emptyUser: {
    email: '',
    password: '',
  },
  invalidEmail: {
    email: 'testtest.com',
    password: 'Tester@2025',
  },
};

const uniqueEmail = `user_${Date.now()}@example.com`
const uniqueCuit = `20-${Math.floor(10000000 + Math.random() * 90000000)}-9`

const validClient = {
  name: "Andrés López",
  cuit: uniqueCuit,
  email: uniqueEmail,
  phone: "+54 9 11 1234-5678",
  address: "Av. Corrientes 1234, Buenos Aires, Argentina",
  balance: 15230.75,
  is_active: true,
};

let createdClientId;

// Describe general con login provisional
describe("Client API tests", () => {
  let token;

  beforeAll(async () => {
    const response = await request(API_URL)
      .post("/login")
      .send(users.validUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
    token = response.body.access_token;
  });

  //GET
  describe("Authorization process", () => {
    // it('Validate credentials and give token', async () =>{
    //   const response = await request(API_URL).post('/login').send(users.validUser)
    //   expect(response.status).toBe(200)
    //   expect (response.body).toHaveProperty("access_token")
    // })

    it("Not valid with wrong credentials", async () => {
      const response = await request(API_URL)
        .post("/login")
        .send(users.invalidUser);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        "Las credenciales proporcionadas son incorrectas."
      );
    });

    it("Not valid with missing email input field", async () => {
      const response = await request(API_URL)
        .post("/login")
        .send(users.emptyEmail);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe(
        "Los datos proporcionados no son válidos."
      );
      expect(response.body.errors.email[0]).toBe(
        "The email field is required."
      );
    });

    it("Not valid with missing password input field", async () => {
      const response = await request(API_URL)
        .post("/login")
        .send(users.emptyPassword);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe(
        "Los datos proporcionados no son válidos."
      );
      expect(response.body.errors.password[0]).toBe(
        "The password field is required."
      );
    });

    it('Validate response of an existing client with id', async () => {
      const response = await request(API_URL)
        .get(`/clients/${createdClientId}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.body.message).toBe(
        "Los datos proporcionados no son válidos."
      );
      expect(response.body.errors.password[0]).toBe(
        "The password field is required."
      );
      expect(response.body.errors.email[0]).toBe(
        "The email field is required."
      );
    });

  // Update tests
  describe('Validate updating client', () => {
    it('Should check a valid URL ID', async () => {
      const response = await request(API_URL)
        .put(`/clients/not-valid-url`)
        .set("Authorization", `Bearer ${token}`)
        .send(validClient);

      expect(response.status).toBe(404);
    });

    it("Should display error messages when send an empty data", async () => {
      const response = await request(API_URL)
        .put(`/clients/${createdClientId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({});

      if (response.status === 200) {
        throw new Error(
          'El backend no está validando correctamente el envio ausente de datos'
        )
      }

      expect([400, 422]).toContain(response.status);
    });

    it("Should return 404 when trying to update a non-existent client", async () => {
      const nonExistingclientId = 2000;

      const response = await request(API_URL)
        .put(`/clients/${nonExistingclientId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(validClient);

      expect(response.status).toBe(404);
    });

    it('Should display error messages when trying to update balance client using text', async () => {
      const updatedClient = {
        ...validClient,
        balance: 'letras',
      }

      const response = await request(API_URL)
        .put(`/clients/${createdClientId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedClient)

      expect(response.status).toBe(500)
      expect(response.text).toContain('Unable to cast value to a decimal')
    })

    it('Should display error messages when trying to update email client using an incorrect email format', async () => {
      const updatedClient = {
        ...validClient,
        email: 'correo-invalido',
      }

      const response = await request(API_URL)
        .put(`/clients/${createdClientId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedClient)

      if (response.status === 200) {
        throw new Error(
          'El backend no está validando correctamente el formato de email'
        )
      }

      expect([400, 422]).toContain(response.status)
    })

    it('Should update an existing client with valid data', async () => {
      const updatedClient = {
        ...validClient,
        address: "Nueva dirección 123",
      };

      const response = await request(API_URL)
        .put(`/clients/${createdClientId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedClient);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("address", "Nueva dirección 123");
    });
  });

  // Delete tests
  describe('Validate deleting client', () => {
    it('Should check a valid URL ID', async () => {
      const response = await request(API_URL)
        .delete(`/clients/not-valid-url`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it("Should return a 404 when trying to delete a non-existent client", async () => {
      const nonExistingclientId = 2000;

      const response = await request(API_URL)
        .delete(`/clients/${nonExistingclientId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it("Should delete a client", async () => {
      const response = await request(API_URL)
        .delete(`/clients/${createdClientId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });

  describe("Authorization checks", () => {
    it("Should return 401 when token is missing", async () => {
      const response = await request(API_URL).get("/clients").send();

      expect(response.status).toBe(401);
    });

    it("Should return 401 with an invalid token", async () => {
      const response = await request(API_URL)
        .get("/clients")
        .set("Authorization", "Bearer invalid_token")
        .send();

      expect(response.status).toBe(401);
    });
  });
});

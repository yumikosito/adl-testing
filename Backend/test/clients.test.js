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

const request = require('supertest')
require('dotenv').config()

const API_URL = process.env.API_URL

const validClient = {
  name: 'Andrés López',
  cuit: '20-12345678-9',
  email: 'andres.lopez@example.com',
  phone: '+54 9 11 1234-5678',
  address: 'Av. Corrientes 1234, Buenos Aires, Argentina',
  balance: 15230.75,
  is_active: true,
}

describe('Validate updating client', () => {
  it('Should check a valid URL ID', async () => {
    const response = await request(API_URL)
      .put(`/clients/not-valid-url`)
      .send(validClient)

    expect(response.status).toBe(404)
  })

  it('Should display error messages when send an empty data', async () => {
    const validClientId = 56

    const response = await request(API_URL)
      .put(`/clients/${validClientId}`)
      .send({})

    if (response.status === 200) {
      throw new Error('El backend no está validando correctamente')
    }

    expect([400, 422]).toContain(response.status)
  })

  it('Should validate that the balance of the client is greater or equal to 0', async () => {
    const clientWithNegativeBalance = { ...validClient, balance: -1 }
    const validClientId = 56

    const response = await request(API_URL)
      .put(`/clients/${validClientId}`)
      .send(clientWithNegativeBalance)

    if (response.status === 200) {
      throw new Error('El backend no está validando correctamente')
    }

    expect([400, 422]).toContain(response.status)
  })

  it('Should return 404 when trying to update a non-existent client', async () => {
    const nonExistingclientId = 2000

    const response = await request(API_URL)
      .put(`/clients/${nonExistingclientId}`)
      .send(validClient)

    expect(response.status).toBe(404)
  })

  it('Should update an existing client with valid data', async () => {
    const validClientId = 56

    const updatedClient = {
      ...validClient,
      address: 'Nueva dirección 123',
    }

    const response = await request(API_URL)
      .put(`/clients/${validClientId}`)
      .send(updatedClient)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('address', 'Nueva dirección 123')
  })
})

describe('Validate deleting client', () => {
  it('Should check a valid URL ID', async () => {
    const response = await request(API_URL).delete(`/clients/not-valid-url`)

    expect(response.status).toBe(404)
  })

  it('Should return a 404 when trying to delete a non-existent client', async () => {
    const nonExistingclientId = 2000

    const response = await request(API_URL).delete(
      `/clients/${nonExistingclientId}`
    )

    expect(response.status).toBe(404)
  })

  it('Should delete a client', async () => {
    const validClientId = 56

    const response = await request(API_URL).delete(`/clients/${validClientId}`)

    expect(response.status).toBe(204)
  })
})

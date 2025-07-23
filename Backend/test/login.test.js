 const request = require('supertest')
 require('dotenv').config()
 
 const users = {
  validUser: {
    email: 'testeradl@test.com',
    password: 'Tester@2025',
  },
  invalidUser : {
    email: 'testeradl1@test.com',
    password: 'Tester@2026',
  },
  emptyEmail : {
    email: '',
    password: 'Tester@2025',
  },
  emptyPassword : {
    email: 'testeradl@test.com',
    password: '',
  },
  emptyUser : {
    email: '',
    password: '',
  },
  invalidEmail : {
    email: 'testtest.com',
    password: 'Tester@2025',
  },
}
 describe ('Authorization process', () => {
    it('Validate credentials and give token', async () =>{
      const response = await request(API_URL).post('/login').send(users.validUser)
      expect(response.status).toBe(200)
      expect (response.body).toHaveProperty("access_token")
    })

    it('Not valid with wrong credentials', async () =>{
      const response = await request(API_URL).post('/login').send(users.invalidUser)
      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Las credenciales proporcionadas son incorrectas.')
    })

    it('Not valid with missing email input field', async () =>{
      const response = await request(API_URL).post('/login').send(users.emptyEmail)
      expect(response.status).toBe(422)
      expect(response.body.message).toBe('Los datos proporcionados no son válidos.')
      expect(response.body.errors.email[0]).toBe('The email field is required.')
    })

    it('Not valid with missing password input field', async () =>{
      const response = await request(API_URL).post('/login').send(users.emptyPassword)
      expect(response.status).toBe(422)
      expect(response.body.message).toBe('Los datos proporcionados no son válidos.')
      expect(response.body.errors.password[0]).toBe('The password field is required.')
    })

    it('Not valid with missing email and password input field', async () =>{
      const response = await request(API_URL).post('/login').send(users.emptyUser)
      expect(response.status).toBe(422)
      console.log(response.body.errores);
      
      expect(response.body.message).toBe('Los datos proporcionados no son válidos.')
      expect(response.body.errors.password[0]).toBe('The password field is required.')
      expect(response.body.errors.email[0]).toBe('The email field is required.')
    })

    it('Not valid with wrong email', async () =>{
      const response = await request(API_URL).post('/login').send(users.invalidEmail)
      expect(response.status).toBe(422)
      console.log(response.body.errores);
      
      expect(response.body.message).toBe('Los datos proporcionados no son válidos.')
      expect(response.body.errors.email[0]).toBe('The email field must be a valid email address.')
    })
  })
const request = require("supertest")
const app =require("../app")
const URL_BASE = '/api/v1/users';

let TOKEN
let userId

beforeAll(async() => {

    const user = {
        email:"john.doe@gmail.com", 
        password: "password123" ,
    }

    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user)

    // console.log(res.body);
    TOKEN = res.body.token
})

test("GET -> URL_BASE, should return statusCode 200, and res.body.length ===1 ", async () => {
    const res=await request(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("POST -> URL_BASE, should return statusCode 201, and res.body.firstName === user.firstName", async () => {
    const user = {
      firstName: "Maicol",
      lastName: "Salazar",
      email: "maicol@gmail.com",
      password: "maicol1234",
      phone: "1234"
    }
    const res = await request(app)
      .post(URL_BASE)
      .send(user)
  
    userId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
  })

test("PUT -> URL_BASE/:id, should return statusCode 200, and res.body.lastName === userUpdate.lastName", async () => {
    const userUpdate = {
      lastName:"Andrade"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${userId}`)
        .send(userUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe(userUpdate.lastName)
});

test("POST -> URL_BASE/:login, should return statusCode 200, and res.body.user.email === user.email and res.body.token to be defined", async () => {

  const user = {
    email : 'maicol@gmail.com',
    password : 'maicol1234'
  }

  const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(user.email)
    expect(res.body.token).toBeDefined()
})

test("POST 'URL_BASE/login', should return statusCode 401", async () => {

  const userInvalid = {
    email : 'wrongemail@gmail.com',
    password : 'Invalid password'
  }

  const res = await request(app)
  .post(`${URL_BASE}/login`)
  .send(userInvalid)

  expect(res.statusCode).toBe(401)
})

test("Delete -> URL_BASE/:id should return statusCode 204", async () => {
  const res = await request(app)
      .delete(`${URL_BASE}/${userId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      
  expect(res.statusCode).toBe(204)
});


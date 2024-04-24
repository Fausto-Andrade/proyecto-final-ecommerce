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
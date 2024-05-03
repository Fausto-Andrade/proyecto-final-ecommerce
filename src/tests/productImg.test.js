const request = require('supertest')
const app = require('../app')
const URL_BASE = '/api/v1/product_images';

let TOKEN

beforeAll(async () => {
    const user = {
        email:"john.doe@gmail.com", 
        password: "password123" , 
    }

    const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)

    TOKEN = res.body.token
})

test("POST -> URL_BASE, should return statusCode 201, and res.body.url to be defined and res.body.file to be defined", async () => {
    const localImage = path.join(__dirname, '..', 'public', 'Image.jpg')

    const res = await request(app)
      .post(URL_BASE)
      .send(Authorization, `Bearer ${TOKEN}`)
      .attach(image, localImage)
  
    userId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.filename).toBeDefined()
    expect(res.body.url).toBeDefined()
  })

  test("GET -> URL_BASE, should return statusCode 200, and res.body.length ===1 ", async () => {
    const res=await request(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Delete -> URL_BASE/:id should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${imageId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        
    expect(res.statusCode).toBe(204)
  });
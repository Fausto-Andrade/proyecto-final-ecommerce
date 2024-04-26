require("../models")
const Category = require("../models/Category");
const request = require("supertest")
const app = require('../app')
const URL_BASE = '/api/v1/products';

let category
let TOKEN
let productId
let product

beforeAll(async () => {

    const user = {
        email:"john.doe@gmail.com", 
        password: "password123" 
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user)
    
    TOKEN = res.body.token

    category = await Category.create({ name: 'tecno' })
  })

test("POST 'URL_BASE', should return statusCode 201, and res.body.title === products.title", async () => {

      product = {
      title: "Celular",
      description: "iphone 15 256gb",
      price: 890,
      categoryId: category.id
    }
  
    const res = await request(app)
      .post(URL_BASE)
      .send(product)
      .set("Authorization", `Bearer ${TOKEN}`)

      productId = res.body.id
  
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

  })

  test("GET 'URL_BASE', should return statusCode 200, and res.body.length === 1", async () => {
    
    const res = await request(app)
        .get(URL_BASE)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    
})

test("GET -> URL_BASE/:id, should return statusCode 201, and res.body.length ===1 ", async () => {
    const res = await request(app)
        .get(`${URL_BASE}/${productId}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

    // Siempre va en la ultima linea del ultimo test a realizar.
}) 

test("PUT -> URL_BASE, should return statusCode 200, and res.body.title === bodyUpdate.title", async () => {

    const bodyUpdate = {
        title: "iphone 15 pro max"
    }
    
    const res = await request(app)
        .put(`${URL_BASE}/${productId}`)
        .send(bodyUpdate)
        .set("Authorization", `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(bodyUpdate.title)
})


test('Delete -> BASE_URL, should return statusCode 204', async () => {
    const res = await request(app)
      .delete(`${URL_BASE}/${productId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(204)
    
    await category.destroy()

    })
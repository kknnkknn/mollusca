import request from 'supertest'

const baseUrl = 'http://localhost:3000'

describe('GET /api/tasks', () => {
  test('returns 401 if user is not authenticated', async () => {
    const res = await request(baseUrl)
      .get('/api/tasks')
      .expect('Content-Type', /json/)
      .expect(401)

    expect(res.body).toEqual({ error: 'Unauthorized'})
  })

  test('returns 200 and task list when authenticated', async() => {
    const agent = request.agent(baseUrl)

    await agent
      .post('/api/auth/callback/credentials')
      .send({ email: 'test@example.com', password: 'mypassword'})
      .expect(302)

    const res = await request(baseUrl)
      .get('/api/tasks')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(Array.isArray(res.body)).toBe(true)
  })
})

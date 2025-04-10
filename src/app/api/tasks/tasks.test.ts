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
})

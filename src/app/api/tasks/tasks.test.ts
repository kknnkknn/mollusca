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

    const loginRes = await agent.post(`/api/test-login`).expect(200)
    console.log('Login set-cookie header:', loginRes.headers['set-cookie'])

    const taskRes = await agent.get(`/api/tasks`)
//      .expect('Content-Type', /json/)
//      .expect(200)
    console.log('Task request headers:', taskRes.request.header)


//    expect(Array.isArray(taskRes.body)).toBe(true)
  })
})

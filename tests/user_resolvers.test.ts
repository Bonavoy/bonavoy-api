import { User } from '@prisma/client'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { createMockContext, createTestServer, PrismaMock } from './helpers'

describe('Test User GQL Resolvers', () => {
  describe('User test suite', () => {
    let prismaMock: PrismaMock
    let testServer: ApolloServer<ExpressContext>
    beforeEach(() => {
      prismaMock = createMockContext()
      testServer = createTestServer(prismaMock)
    })

    it('Should return a newly created user', async () => {
      const newUser: User = {
        id: 'somerandomid',
        email: 'test@test.com',
        username: 'testname',
        firstname: 'first',
        lastname: 'last',
        password: 'password123',
        avatar: null,
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      // force mock db to return a user
      prismaMock.prisma.user.create.mockResolvedValueOnce(newUser)

      const response = await testServer.executeOperation({
        query: `
          mutation Mutation($input: UserInput) {
            createUser(input: $input) {
              id
              email
              username
              firstname
              lastname
              avatar
              verified
            }
          }
        `,
        variables: {
          input: {
            username: 'testname',
            email: 'test@test.com',
            password: 'password123',
            firstname: 'first',
            lastname: 'last',
          },
        },
      })

      const { data } = response
      expect(response.errors).toBeUndefined()

      const createUser = data?.createUser
      expect(createUser?.id).toBe('somerandomid')
      expect(createUser?.email).toBe('test@test.com')
      expect(createUser?.username).toBe('testname')
      expect(createUser?.firstname).toBe('first')
      expect(createUser?.lastname).toBe('last')
      expect(createUser?.avatar).toBeNull()
      expect(createUser?.verified).toBe(false)
    })
  })

  describe('CreateUser test suite', () => {})

  describe('Authencate test suite', () => {})

  describe('Token test suite', () => {})
})

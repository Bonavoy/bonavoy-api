import { PrismaClient, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { createMockContext, createTestServer, PrismaMock } from './helpers'

describe('Test User GQL Resolvers', () => {
  describe('CreateUser test suite', () => {
    const createUserQuery = `
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
        `

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
        query: createUserQuery,
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

    it('Should return error message for duplicate email', async () => {
      // need to set the error code for prisma error to get correct gql error message. pass empty string for other inputs
      prismaMock.prisma.user.create.mockRejectedValueOnce(new PrismaClientKnownRequestError('', 'P2002', ''))

      const response = await testServer.executeOperation({
        query: createUserQuery,
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

      expect(response.errors![0].message).toBe('Email already exists')
    })

    it('Should return general database errror message', async () => {
      prismaMock.prisma.user.create.mockRejectedValueOnce(new Error('idk'))

      const response = await testServer.executeOperation({
        query: createUserQuery,
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

      expect(response.errors![0].message).toBe('Error Creating User')
    })

    it('Should return error message for invalid email', async () => {
      const response = await testServer.executeOperation({
        query: createUserQuery,
        variables: {
          input: {
            username: 'testname',
            email: 't@t.c',
            password: 'password123',
            firstname: 'first',
            lastname: 'last',
          },
        },
      })

      expect(response.errors![0].message).toBe('Email is invalid')
    })

    it('Should return error message for short lastname', async () => {
      const response = await testServer.executeOperation({
        query: createUserQuery,
        variables: {
          input: {
            username: 'testname',
            email: 'test@test.com',
            password: 'password123',
            firstname: 'first',
            lastname: 'l',
          },
        },
      })

      expect(response.errors![0].message).toBe('Lastname must be between 2 and 50 characters')
    })

    it('Should return error message for long lastname', async () => {
      const response = await testServer.executeOperation({
        query: createUserQuery,
        variables: {
          input: {
            username: 'testname',
            email: 'test@test.com',
            password: 'password123',
            firstname: 'first',
            lastname: 'sdfasdfasfasdfasdfasdfasdfasdfadsfasdfasdfasdfadfas',
          },
        },
      })

      expect(response.errors![0].message).toBe('Lastname must be between 2 and 50 characters')
    })

    it('Should return error message for short firstname', async () => {
      const response = await testServer.executeOperation({
        query: createUserQuery,
        variables: {
          input: {
            username: 'testname',
            email: 'test@test.com',
            password: 'password123',
            firstname: 'f',
            lastname: 'last',
          },
        },
      })

      expect(response.errors![0].message).toBe('Firstname must be between 2 and 50 characters')
    })

    it('Should return error message for long firstname', async () => {
      const response = await testServer.executeOperation({
        query: createUserQuery,
        variables: {
          input: {
            username: 'testname',
            email: 'test@test.com',
            password: 'password123',
            firstname: 'sdfasdfasfasdfasdfasdfasdfasdfadsfasdfasdfasdfadfas',
            lastname: 'last',
          },
        },
      })

      expect(response.errors![0].message).toBe('Firstname must be between 2 and 50 characters')
    })

    it('Should return error message for short username', async () => {
      const response = await testServer.executeOperation({
        query: createUserQuery,
        variables: {
          input: {
            username: 'a',
            email: 'test@test.com',
            password: 'password123',
            firstname: 'first',
            lastname: 'last',
          },
        },
      })

      expect(response.errors![0].message).toBe('Username must be between 2 and 50 characters')
    })

    it('Should return error message for long username', async () => {
      const response = await testServer.executeOperation({
        query: createUserQuery,
        variables: {
          input: {
            username: 'sdfasdfasfasdfasdfasdfasdfasdfadsfasdfasdfasdfadfas',
            email: 'test@test.com',
            password: 'password123',
            firstname: 'first',
            lastname: 'last',
          },
        },
      })

      expect(response.errors![0].message).toBe('Username must be between 2 and 50 characters')
    })

    it('Should return error message for short password', async () => {
      const response = await testServer.executeOperation({
        query: createUserQuery,
        variables: {
          input: {
            username: 'testname',
            email: 'test@test.com',
            password: 'a',
            firstname: 'first',
            lastname: 'last',
          },
        },
      })

      expect(response.errors![0].message).toBe('Password must be between 6 and 32 characters')
    })

    it('Should return error message for long password', async () => {
      const response = await testServer.executeOperation({
        query: createUserQuery,
        variables: {
          input: {
            username: 'testname',
            email: 'test@test.com',
            password: '9u34ij23j894rj23i9u4jn239iu48234n92394238n42u934n82934n92n4',
            firstname: 'first',
            lastname: 'last',
          },
        },
      })

      expect(response.errors![0].message).toBe('Password must be between 6 and 32 characters')
    })
  })

  describe('User test suite', () => {})

  describe('Authencate test suite', () => {})

  describe('Token test suite', () => {})
})

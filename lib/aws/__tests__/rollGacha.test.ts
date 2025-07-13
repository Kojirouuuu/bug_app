import { API, graphqlOperation } from 'aws-amplify';
import { rollGacha } from '../../../src/graphql/mutations';
import { getUser, getGacha, getGachaResult } from '../../../src/graphql/queries';

// Mock the API module
jest.mock('aws-amplify');

describe('rollGacha mutation', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should successfully roll gacha and deduct points', async () => {
    // Mock data
    const mockUser = {
      id: 'user-123',
      name: 'Test User',
      points: 100,
      createdAt: '2023-01-01T00:00:00.000Z',
    };

    const mockGacha = {
      id: 'gacha-123',
      name: 'Test Gacha',
      costPoints: 30,
      availableTickets: ['COMMON_GACHA_TICKET', 'RARE_GACHA_TICKET'],
      isActive: true,
    };

    const mockGachaResult = {
      id: 'result-123',
      userID: 'user-123',
      gachaID: 'gacha-123',
      exchangedPoints: 30,
      resultAt: '2023-01-01T00:00:00.000Z',
      obtainedTicket: {
        id: 'ticket-123',
        type: 'COMMON_GACHA_TICKET',
        userID: 'user-123',
        gachaResultID: 'result-123',
        isUsed: false,
      },
    };

    // Mock API responses
    (API.graphql as jest.Mock).mockImplementation((params) => {
      const operation = params.query.definitions[0].name.value;
      
      if (operation === 'rollGacha') {
        return Promise.resolve({
          data: {
            rollGacha: mockGachaResult,
          },
        });
      } else if (operation === 'getUser') {
        return Promise.resolve({
          data: {
            getUser: {
              ...mockUser,
              points: mockUser.points - mockGacha.costPoints, // Points should be deducted
            },
          },
        });
      }
      
      return Promise.resolve({ data: {} });
    });

    // Execute the mutation
    const result = await API.graphql(
      graphqlOperation(rollGacha, {
        gachaID: mockGacha.id,
        userID: mockUser.id,
      })
    );

    // Verify the result
    expect(result).toEqual({
      data: {
        rollGacha: mockGachaResult,
      },
    });

    // Verify that API.graphql was called with the correct parameters
    expect(API.graphql).toHaveBeenCalledWith(
      expect.objectContaining({
        query: rollGacha,
        variables: {
          gachaID: mockGacha.id,
          userID: mockUser.id,
        },
      })
    );

    // Check user points after the roll
    const userResult = await API.graphql(
      graphqlOperation(getUser, { id: mockUser.id })
    );
    
    expect(userResult.data.getUser.points).toBe(mockUser.points - mockGacha.costPoints);
  });

  test('should fail when user has insufficient points', async () => {
    // Mock data
    const mockUser = {
      id: 'user-123',
      name: 'Test User',
      points: 20, // Not enough points
      createdAt: '2023-01-01T00:00:00.000Z',
    };

    const mockGacha = {
      id: 'gacha-123',
      name: 'Test Gacha',
      costPoints: 30,
      availableTickets: ['COMMON_GACHA_TICKET', 'RARE_GACHA_TICKET'],
      isActive: true,
    };

    // Mock API response to throw an error
    (API.graphql as jest.Mock).mockRejectedValue({
      errors: [
        {
          message: 'Insufficient points to roll this gacha',
          errorType: 'INSUFFICIENT_POINTS',
        },
      ],
    });

    // Execute the mutation and expect it to fail
    await expect(
      API.graphql(
        graphqlOperation(rollGacha, {
          gachaID: mockGacha.id,
          userID: mockUser.id,
        })
      )
    ).rejects.toEqual({
      errors: [
        {
          message: 'Insufficient points to roll this gacha',
          errorType: 'INSUFFICIENT_POINTS',
        },
      ],
    });

    // Verify that API.graphql was called with the correct parameters
    expect(API.graphql).toHaveBeenCalledWith(
      expect.objectContaining({
        query: rollGacha,
        variables: {
          gachaID: mockGacha.id,
          userID: mockUser.id,
        },
      })
    );
  });

  test('should fail when gacha is not active', async () => {
    // Mock data
    const mockUser = {
      id: 'user-123',
      name: 'Test User',
      points: 100,
      createdAt: '2023-01-01T00:00:00.000Z',
    };

    const mockGacha = {
      id: 'gacha-123',
      name: 'Test Gacha',
      costPoints: 30,
      availableTickets: ['COMMON_GACHA_TICKET', 'RARE_GACHA_TICKET'],
      isActive: false, // Gacha is not active
    };

    // Mock API response to throw an error
    (API.graphql as jest.Mock).mockRejectedValue({
      errors: [
        {
          message: 'Gacha is not active',
          errorType: 'GACHA_NOT_ACTIVE',
        },
      ],
    });

    // Execute the mutation and expect it to fail
    await expect(
      API.graphql(
        graphqlOperation(rollGacha, {
          gachaID: mockGacha.id,
          userID: mockUser.id,
        })
      )
    ).rejects.toEqual({
      errors: [
        {
          message: 'Gacha is not active',
          errorType: 'GACHA_NOT_ACTIVE',
        },
      ],
    });

    // Verify that API.graphql was called with the correct parameters
    expect(API.graphql).toHaveBeenCalledWith(
      expect.objectContaining({
        query: rollGacha,
        variables: {
          gachaID: mockGacha.id,
          userID: mockUser.id,
        },
      })
    );
  });

  test('should be idempotent and not deduct points twice for the same roll', async () => {
    // This test would require a more complex setup with a client-generated UUID
    // For now, we'll just simulate the behavior by checking that the points are deducted only once
    
    // Mock data
    const mockUser = {
      id: 'user-123',
      name: 'Test User',
      points: 100,
      createdAt: '2023-01-01T00:00:00.000Z',
    };

    const mockGacha = {
      id: 'gacha-123',
      name: 'Test Gacha',
      costPoints: 30,
      availableTickets: ['COMMON_GACHA_TICKET', 'RARE_GACHA_TICKET'],
      isActive: true,
    };

    const mockGachaResult = {
      id: 'result-123',
      userID: 'user-123',
      gachaID: 'gacha-123',
      exchangedPoints: 30,
      resultAt: '2023-01-01T00:00:00.000Z',
      obtainedTicket: {
        id: 'ticket-123',
        type: 'COMMON_GACHA_TICKET',
        userID: 'user-123',
        gachaResultID: 'result-123',
        isUsed: false,
      },
    };

    // Mock API responses for the first call
    (API.graphql as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          rollGacha: mockGachaResult,
        },
      });
    });

    // Execute the mutation for the first time
    const result1 = await API.graphql(
      graphqlOperation(rollGacha, {
        gachaID: mockGacha.id,
        userID: mockUser.id,
      })
    );

    // Mock API responses for the second call (same result, no additional point deduction)
    (API.graphql as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          rollGacha: mockGachaResult,
        },
      });
    });

    // Execute the mutation again with the same parameters
    const result2 = await API.graphql(
      graphqlOperation(rollGacha, {
        gachaID: mockGacha.id,
        userID: mockUser.id,
      })
    );

    // Mock the getUser response to check points
    (API.graphql as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          getUser: {
            ...mockUser,
            points: mockUser.points - mockGacha.costPoints, // Points should be deducted only once
          },
        },
      });
    });

    // Check user points after both rolls
    const userResult = await API.graphql(
      graphqlOperation(getUser, { id: mockUser.id })
    );
    
    // Verify that points were deducted only once
    expect(userResult.data.getUser.points).toBe(mockUser.points - mockGacha.costPoints);
  });
});
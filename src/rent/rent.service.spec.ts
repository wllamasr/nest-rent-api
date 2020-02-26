import { Test, TestingModule } from '@nestjs/testing';
import { RentService } from './rent.service';
import { getModelToken } from '@nestjs/sequelize';
import { Rent } from './rent.model';
import mockRent from './mocks/rent.mock';
describe('RentService', () => {
  let rentService: RentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentService,
        {
          provide: getModelToken(Rent),
          useValue: mockRent()
        }
      ],
    }).compile();

    rentService = module.get<RentService>(RentService);
  });

  describe('findAll', () => {
    it('get all items', async () => {
      const result = await rentService.findAll();
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(3);
    })
  })

  describe('findOne', () => {
    it('returns just one item with id 1', async () => {
      const result = await rentService.findOne(3);
      expect(result).toBeDefined()
      expect(result).toEqual({
        "id": 3,
        "from_date": "2021-06-07T00:00:00.000Z",
        "to_date": "2021-06-09T00:00:00.000Z",
        "total": 0,
        "item_id": 1,
        "user_id": 1,
        "status": "rented",
        "createdAt": "2020-02-26T14:47:17.000Z",
        "updatedAt": "2020-02-26T14:47:17.000Z"
      })
    })
  })

  it('should be defined', () => {
    expect(rentService).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { getModelToken } from '@nestjs/sequelize';
import { Item } from './item.model';
import mockItem from './mock/item.mock';

describe('ItemService', () => {
  let itemService: ItemService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: getModelToken(Item),
          useValue: mockItem()
        }
      ],
    }).compile();

    itemService = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(itemService).toBeDefined();
  });

  describe('findAll', () => {
    it('get all items', async () => {
      const result = await itemService.findAll();
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(3);
    })
  })

  describe('findOne', () => {
    it('returns just one item with id 1', async () => {
      const result = await itemService.findOne(1);
      expect(result).toBeDefined()
      expect(result).toEqual({
        id: 1,
        name: 'Billie Bergnaum',
        price: 456789,
        amount: 3,
        createdAt: '2020-02-26T13:30:07.000Z',
        updatedAt: '2020-02-26T13:30:07.000Z'
      })
    })
  })
});

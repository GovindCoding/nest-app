import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '3434343545',
      name: 'Item One',
      qty: 100,
      description: 'This is description for item one',
    },
    {
      id: '321212312',
      name: 'Item Two',
      qty: 100,
      description: 'This is description for item two',
    },
  ];

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: string): Item {
    return this.items.find((item) => item.id === id);
  }
}

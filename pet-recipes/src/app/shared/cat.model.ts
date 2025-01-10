// src/app/shared/models/cat.model.ts
import { Pet } from './pet.model';

export class Cat extends Pet {
  constructor(
    id: number,
    name: string,
    age: number,
    description: string,
    imageUrl: string,
    public favoriteToy: string
  ) {
    super(id, name, 'Cat', age, description, imageUrl);
  }

  meow(): string {
    return `${this.name} says: Meow!`;
  }
}

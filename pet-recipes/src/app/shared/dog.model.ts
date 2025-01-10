import { Pet } from './pet.model';

export class Dog extends Pet {
  constructor(
    id: number,
    name: string,
    age: number,
    description: string,
    imageUrl: string,
    public breed: string
  ) {
    super(id, name, 'Dog', age, description, imageUrl);
  }

  bark(): string {
    return `${this.name} says: Woof! Woof!`;
  }
}

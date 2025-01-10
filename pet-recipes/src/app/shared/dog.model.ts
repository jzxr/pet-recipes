import { Pet } from './pet.model';

export class Dog extends Pet {
  constructor(
    id: number,
    name: string,
    birthDate: string,
    description: string,
    imageUrl: string,
    public breed: string
  ) {
    super(id, name, 'Dog', birthDate, description, imageUrl);
  }

  bark(): string {
    return `${this.name} says: Woof! Woof!`;
  }
}

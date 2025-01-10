export class Pet {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public age: number,
    public description: string,
    public imageUrl: string
  ) {}

  getPetInfo(): string {
    return `${this.name} is a ${this.age}-year-old ${this.type}.`;
  }
}

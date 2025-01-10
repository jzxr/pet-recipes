export class Pet {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public birthDate: string,
    public description: string,
    public imageUrl: string
  ) {}

  getPetInfo(): string {
    return `${this.name} is a ${this.birthDate}-year-old ${this.type}.`;
  }
}

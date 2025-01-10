import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cat } from '../../shared/cat.model';
import { Dog } from '../../shared/dog.model';
import { Pet } from '../../shared/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private pets: Pet[] = [
    new Dog(
      1,
      'Naixi',
      '2022-03-13',
      'A playful Pomeranian!',
      '../../../assets/images/pets/naixi.jpg',
      'Pomeranian'
    ),
    new Cat(
      2,
      'Lily',
      '2024-08-02',
      'A curious Maine Coon and Ragdoll mix.',
      'assets/images/pets/lily.jpg',
      'Feather Wand'
    ),
  ];

  private petsSubject = new BehaviorSubject<Pet[]>(this.pets);
  pets$ = this.petsSubject.asObservable();

  addPet(pet: Pet) {
    this.pets.push(pet);
    this.petsSubject.next(this.pets);
  }

  updatePet(updatedPet: Pet) {
    const index = this.pets.findIndex((p) => p.id === updatedPet.id);
    if (index !== -1) {
      this.pets[index] = updatedPet;
      this.petsSubject.next(this.pets);
    }
  }

  getPets(): Pet[] {
    return this.pets;
  }
}

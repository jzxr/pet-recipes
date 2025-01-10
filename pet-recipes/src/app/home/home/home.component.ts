import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet/pet.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pet } from '../../shared/pet.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
interface AnimatablePet extends Pet {
  state: 'front' | 'back';
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('flipCard', [
      state('front', style({ transform: 'rotateY(0deg)' })),
      state('back', style({ transform: 'rotateY(180deg)' })),
      transition('front <=> back', animate('600ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  private petsSubject = new BehaviorSubject<AnimatablePet[]>([]);
  pets$ = this.petsSubject.asObservable();

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.petService.pets$
      .pipe(
        map((pets) =>
          pets.map((pet) => {
            const animatablePet = { ...pet, state: 'front' } as AnimatablePet;
            Object.setPrototypeOf(animatablePet, Pet.prototype);
            return animatablePet;
          })
        )
      )
      .subscribe((pets) => this.petsSubject.next(pets));
  }

  toggleCard(pet: AnimatablePet): void {
    const updatedPets = this.petsSubject.value.map((p) => {
      if (p.id === pet.id) {
        const updatedPet = { ...p, state: p.state === 'front' ? 'back' : 'front' };
        Object.setPrototypeOf(updatedPet, Pet.prototype);
        return updatedPet as AnimatablePet;
      }
      return p;
    });
    this.petsSubject.next(updatedPets);
  }  

  trackById(index: number, pet: AnimatablePet): number {
    return pet.id;
  }
  calculateAge(birthDate: string): string {
    const today = new Date();
    const birth = new Date(birthDate);
  
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
  
    if (months < 0) {
      years -= 1;
      months += 12;
    }
  
    return `${years} Year${years !== 1 ? 's' : ''} ${months} Month${months !== 1 ? 's' : ''}`;
  }
  
}
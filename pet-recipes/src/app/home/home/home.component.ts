import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private petsSubject = new BehaviorSubject<AnimatablePet[]>([]);
  pets$ = this.petsSubject.asObservable();
  isCaught = false;
  catPosition = { x: 300, y: 150 };
  dogPosition = { x: 100, y: 150 };
  private gameInterval: any;

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
        const updatedPet = {
          ...p,
          state: p.state === 'front' ? 'back' : 'front',
        };
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

    return `${years} Year${years !== 1 ? 's' : ''} ${months} Month${
      months !== 1 ? 's' : ''
    }`;
  }
  moveDog() {
    const dx = this.catPosition.x - this.dogPosition.x;
    const dy = this.catPosition.y - this.dogPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 50) {
      this.isCaught = true;
      this.stopGame();
      return;
    }

    const stepSize = 5; // Speed of the dog
    this.dogPosition.x += (dx / distance) * stepSize;
    this.dogPosition.y += (dy / distance) * stepSize;
  }

  moveCat() {
    if (this.isCaught) return;

    const randomX = Math.random() * 450;
    const randomY = Math.random() * 250;
    this.catPosition.x = randomX;
    this.catPosition.y = randomY;
  }
  startGame() {
    this.isCaught = false;
    this.gameInterval = setInterval(() => {
      this.moveDog();
      if (!this.isCaught) this.moveCat();
    }, 500);
  }

  stopGame() {
    clearInterval(this.gameInterval);
    this.gameInterval = null;
  }

  resetGame() {
    this.stopGame();
    this.catPosition = { x: 300, y: 150 };
    this.dogPosition = { x: 100, y: 150 };
    this.startGame();
  }

  ngAfterViewInit(): void {
    this.startGame(); // Start the game when the view is initialized
  }

  ngOnDestroy(): void {
    this.stopGame(); // Ensure the interval is cleared when the component is destroyed
  }
}

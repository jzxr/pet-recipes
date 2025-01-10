import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet/pet.service';
import { Observable } from 'rxjs';
import { Pet } from '../../shared/pet.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  pets$!: Observable<Pet[]>;
  constructor(public petService: PetService) {}
  ngOnInit(): void {
    this.pets$ = this.petService.pets$;
  }
}

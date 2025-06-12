import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  counter: number = 0;
  loading: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    // Simulamos carga de datos
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  increment(): void {
    this.counter++;
  }

  decrement(): void {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  reset(): void {
    this.counter = 0;
  }
}

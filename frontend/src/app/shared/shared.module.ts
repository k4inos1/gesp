import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";

const MaterialModules = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
  exports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
})
export class SharedModule {}

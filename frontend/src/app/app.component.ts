import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="app">
      <h1>{{ title }}</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .app {
        padding: 20px;
      }
    `,
  ],
})
export class AppComponent {
  title = "My App";
}

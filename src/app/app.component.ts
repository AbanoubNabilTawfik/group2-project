import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'full-project-group-2';
  
  loadedFeature:string='recipe'
  onNavigate(feature:string)
  {
    this.loadedFeature=feature;
  }
}

import { Component } from '@angular/core';
import { MaterialsModule } from '../material/material.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MaterialsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}

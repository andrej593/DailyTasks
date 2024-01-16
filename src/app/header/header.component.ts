import { Component } from '@angular/core';
import { MaterialsModule } from '../material/material.module';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}

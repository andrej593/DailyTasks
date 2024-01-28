import { CommonModule } from '@angular/common';
import { Component, Input ,Output, EventEmitter} from '@angular/core'
import { States, ADaysM, AMonths, Calander} from '../calander';
import { MaterialsModule } from '../../material/material.module';

@Component({
  selector: 'app-week',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './week.component.html',
  styleUrl: './week.component.css'
})
export class WeekComponent {
  states = States;
  days = ADaysM;
  months = AMonths;

  @Input() calander: Calander;
  @Output() stateChanged = new EventEmitter<number>();

  arrayOfLength(len: number) {
    return new Array(len);
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  @Input() dataName = '';
  @Input() dataValue = '';
  @Input() dataIcon = '';
  @Input() dataIconColor = 'black';
  @Input() dataIconBgColor = 'black';
}

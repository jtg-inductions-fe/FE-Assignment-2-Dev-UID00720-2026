import { Component, Input } from '@angular/core';

import { ListCardItem } from '@src/app/core/models/list-card-item';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent {
  @Input() title = '';
  @Input() items: ListCardItem[] = [];
  @Input() valuePrefix = '';
  @Input() valueSuffix = '';
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avtar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input()
  src = '';
}

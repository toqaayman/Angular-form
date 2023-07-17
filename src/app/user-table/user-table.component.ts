import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  constructor(public userService: UserService) { }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  editUser(id: number): void {
    const user = this.userService.getUserById(id);
    if (user) {
      this.userService.setSelectedUser(user);
    }
  }
}

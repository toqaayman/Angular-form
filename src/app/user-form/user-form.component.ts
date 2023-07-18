import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      age: ['', [Validators.required,Validators.compose([Validators.min(16), Validators.max(100)])]],
      salary: ['', [Validators.required,Validators.compose([Validators.min(2000), Validators.max(10000)])]],
      address: ['', [Validators.required,Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.userService.selectedUser.subscribe(user => {
      if (user) {
        this.isEdit = true;
        this.userForm.patchValue(user);
      } else {
        this.isEdit = false;
        this.userForm.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
  
    const user: User = this.userForm.value;
    if (this.isEdit) {
      this.userService.updateUser(user);
    } else {
      this.userService.addUser(user);
    }
    this.userForm.reset();
  }
  
}

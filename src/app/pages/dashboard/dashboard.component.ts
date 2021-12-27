import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public updateForm;
  name = '';
  email = '';
  password = '';
  
  constructor(
      private UserService: UserService,
      formBuilder: FormBuilder
  ) {
    this.updateForm = formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  userInfo: any;
    
  ngOnInit() {
    this.getUserInfo()
  }

  getUserInfo() {
    const localStorageData: any = localStorage.getItem('testeFinger');

    this.userInfo = JSON.parse(localStorageData);
  }

  async updateName() {
    const {name, email, password} = this.updateForm.value;
    const response: any = await this.updateUserInfo({name});

    if (response.statusCode == 200) {
      this.userInfo.name = name;
      alert('Name updated Successful!')
    } else {
      alert(response.message);
    };
  }

  async updateEmail() {
    const {name, email, password} = this.updateForm.value;
    const response: any = await this.updateUserInfo({email});

    if (response.statusCode == 200) {
      alert('Email updated Successful!')
    } else {
      alert(response.message);
    };
  }

  async updatePassword() {
    const {name, email, password} = this.updateForm.value;
    const response: any = await this.updateUserInfo({password});

    if (response.statusCode == 200) {
      alert('Password updated Successful!')
    } else {
      alert(response.message);
    };
  }
  
  updateUserInfo(data: any) {
    const id = this.userInfo.id;
    return this.UserService.updateUser(id ,data);
  }
}

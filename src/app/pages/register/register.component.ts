import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  public registerForm;
  name = '';
  email = '';
  password = '';

  constructor(
    private UserService: UserService,
    private AuthService: AuthService,
    private router: Router,
    formBuilder: FormBuilder
  ) {
    this.registerForm = formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit() {}

  async register() {
    const userInfo = this.registerForm.value;
    const httpResponse: any = await this.UserService.registerUser(userInfo);

    switch (httpResponse.statusCode) {
      case 201:
        this.goToDashboard(userInfo);
        break;
      case 406:
        alert(httpResponse.message);
        break;
    
      default:
        alert(httpResponse.message);
        break;
    }
  }

  async goToDashboard(userInfo: any) {
    const httpResponse: any = await this.AuthService.login(userInfo.email, userInfo.password);

    userInfo.id = httpResponse.userInfo.userId;

    localStorage.setItem('testeFinger', JSON.stringify(userInfo));
    
    this.router.navigate(['/dashboard']);
  }
}
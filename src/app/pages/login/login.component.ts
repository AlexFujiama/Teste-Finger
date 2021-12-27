import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm;
  email = '';
  password = '';
  
  constructor(
    private AuthService: AuthService,
    private router: Router,
    formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() {}

  async login() {
    const { email, password } = this.loginForm.value;
    const httpResponse: any = await this.AuthService.login(email, password);

    console.log(httpResponse)

    switch (httpResponse.statusCode) {
      case 200:
        const userInfo = {
          id: httpResponse.userInfo.userId,
          name: httpResponse.userInfo.username,
          email: email
        }
    
        localStorage.setItem('testeFinger', JSON.stringify(userInfo));
        
        this.router.navigate(['/dashboard']);
        break;
      default:
        alert(httpResponse.message);
        break;
    }
    
  }

}

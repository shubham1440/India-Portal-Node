import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



 loginData={
  username:'',
  password:'',
 };

  constructor(private snack:MatSnackBar ,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }


  formSubmit() {

    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
      this.snack.open('Username is Required !!','clear',{duration:3000,});
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
      this.snack.open('Password is Required !!','clear',{duration:3000,});
      return;
    }


    /***
     * Request to server to generate token
     */

     this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('success');
        console.log(data);

        /***
         * 
         */
        this.login.loginUser(data.token);


        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            /**
             * Redirect to Admin(Admin Dashboard) or Normal(normal DashBoard) User
             */

            if(this.login.getUserRole()=='ADMIN')
            {
              this.router.navigate(['admin']);
              this.login.LoggedInStatus.next(true);
              // window.location.href='/admin';

            }else if(this.login.getUserRole()=='NORMAL')
            {
              this.router.navigate(['user-dashboard']);
              this.login.LoggedInStatus.next(true);
              // window.location.href='/user-dashboard';

            }else{
              this.login.Logout();
            }
            
            
          }


        );


      },
      (error)=>{
        console.log("error");
        console.log(error);

        this.snack.open('Wrong Credential !! try Again','',{duration:3000})
        
      }
    );
    }  
}

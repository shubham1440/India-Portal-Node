import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private _snackBar:MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };


  ngOnInit(): void {
  }

  formSubmit(){
    if(this.user.username==''|| this.user.username==null){
      this._snackBar.open('Username is required !!','clear',{duration:3000});
      return;
    }

    //Validation

    //add User: Service
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        swal.fire('successfully done !! ','User Id is '+data.id,'success');
      },(error)=>{
        //error
        console.log(error);
        this._snackBar.open('Something Entered Wrong','clear',{duration:3000});
        
      }
    )
  }

}

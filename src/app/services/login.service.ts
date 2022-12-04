import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public LoggedInStatus = new Subject<Boolean>();


//   isLoggedIn() {
// throw new Error('Method not implemented.');
// }

  constructor(private http:HttpClient) { }

  /***
   * current User
   */
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }



  /**
   * generate token
   */

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  /**
   * LogIn User:Set token in LocalStorage
   */

  public loginUser(token)
  {
    localStorage.setItem('token',token);
    return true;
  }

  /**
   * isLogIn:User is Log in or not
   */

  public isLoggedIn()
  {
    let cookie = localStorage.getItem("token");

    if(cookie==undefined || cookie == '' || cookie == null)
    {
      return false;
    }
    return true;
  }
  /**
   * LogOut : User want to logout
   */

  public Logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
  /**
   * Get Token from Local Storage
   */

  public getToken()
  {
    return localStorage.getItem("token");
  }
  /**
   * Set User in Cookie
   */
  public setUser(user)
  {
    localStorage.setItem("user",JSON.stringify(user));
  }
  /**
   * Get User from cookie
   * @returns 
   */

  public getUser()
  {
    let User = localStorage.getItem("user");
    if(User!=null)
    {
      return JSON.parse(User);
    }
    this.Logout();
    return null;
  }

  /**
   * Find User Role
   */
  public getUserRole()
  {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}

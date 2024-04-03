import { IUserLoginResponse } from './../Interfaces/IUserLoginResponse';
import { IUserLogin } from './../Interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRegister } from '../Interfaces/IUserRegister';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accountRegisterUrl = 'https://localhost:7110/api/Account/Register';
  private accountLoginUrl = 'https://localhost:7110/api/Account/Login';
  user = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {}

  signUp(user: IUserRegister): Observable<IUserRegister> {
    return this.httpClient.post<IUserRegister>(this.accountRegisterUrl, user);
  }
  logIn(user: IUserLogin): Observable<IUserLogin> {
    return this.httpClient.post<IUserLogin>(this.accountLoginUrl, user).pipe(
      tap((res) => {
        this.handleCreateUser(res);
      })
    );
  }
  logOut() {
    this.user.next(null);
  }
  private handleCreateUser(res: any) {
    const user = new User(
      res.userID,
      res.email,
      res.tokken,
      res.roles,
      res.expireDate
    );
    this.user.next(user);
    // localStorage.setItem('user', JSON.stringify(user));
  }
}

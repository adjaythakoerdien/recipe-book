import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhK8LRcpeXWXm79ZrWrugqzE6mmLoieJ8',
  {
      email: email,
      password: password,
      returnSecurToken: true
    }
   ).pipe(
     catchError(this.handleError),
     tap(resData => {
     this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
   })
   );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhK8LRcpeXWXm79ZrWrugqzE6mmLoieJ8',
    {
      email: email,
      password: password,
      returnSecurToken: true
    }
    )
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
   })
   );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(
    email: string, 
    userId: string, 
    token: string, 
    expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
     const user = new User(email, userId, token, expirationDate);
     this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'

    if (!errorRes || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS': errorMessage = 'This email has already been used, klootzak!'; break;
      case 'EMAIL_NOT_FOUND': errorMessage = 'Invalid email/password'; break;
      case 'INVALID_PASSWORD': errorMessage = 'Invalid email/password'; break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': errorMessage = 'To many trys, please try again later'; break;
    }
    return throwError(errorMessage)
  }
}

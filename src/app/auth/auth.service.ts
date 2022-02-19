import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhK8LRcpeXWXm79ZrWrugqzE6mmLoieJ8',
  {
      email: email,
      password: password,
      returnSecurToken: true
    }
   ).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occurred!'

      if (!errorRes || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS': errorMessage = 'This email has already been used, klootzak!'; break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER': errorMessage = 'To many trys, please try again later'; break;
      }
      return throwError(errorMessage)
    }));
  }
}
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  platformId=inject(PLATFORM_ID);
  isLoggedIn = signal<string | null | undefined>(undefined);

  setLoggedIn() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem("access_token")) {
      this.isLoggedIn.set(localStorage.getItem("access_token"));
    } else {
      this.isLoggedIn.set(null);
    }
  }
}

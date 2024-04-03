import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Models/User';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private userSubject: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      console.log(user);
      this.isLoggedIn = user ? true : false;
    });
  }

  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.userSubject?.unsubscribe();
  }
}

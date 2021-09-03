import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CredentialService } from '../services/credential.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class SecondaryNavbarComponent implements OnInit {

  userName = '';
  userNameInitial = '';

  constructor(
    private credentialService: CredentialService,
    private userService:UserService,
    private el: ElementRef,
    private authService:AuthService,
    private router:Router) {
  }

  ngOnInit(): void {
    this.successUser();
  }

  successUser() {
    this.userService.getUserData().subscribe((data)=>{
      this.userName = data.User.fullName;
      this.userNameInitial =  data.User.fullName.charAt(0);
    });
  }

  profilePopup() {
    let menuPopup =  document.querySelector('.menu-popup');
    menuPopup?.classList.toggle('fab-pro-active');
  }

  // Close the dropdown if the user clicks outside of it
  profileClose() {
    var menuPopup =  document.querySelector('.menu-popup');
    menuPopup?.classList.remove('fab-pro-active');
  }

  onClick(event:any) {
    if (!this.el.nativeElement.contains(event.target)) {// or some similar check
      this.profileClose();
    }
  }

  logout() {
    localStorage.setItem('authStatus','false');
    localStorage.setItem('userToken','null');
    localStorage.setItem('uid','null');
    this.router.navigateByUrl('');
  }
}

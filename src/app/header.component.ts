import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'header.component.html',
})

export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  isUserDropdownOpen: boolean = false;
  isNavbarCollapsed: boolean = true;

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}

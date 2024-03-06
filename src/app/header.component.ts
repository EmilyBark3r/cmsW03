import { Component, Output, EventEmitter, OnInit, NgModule, Directive, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor() {}

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}

@Component({
  selector: 'app-header',
  standalone: true,
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

import { Component } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-taywordle',
  imports: [Sidebar, Header, MatDrawerContainer, MatDrawer],
  templateUrl: './taywordle.html',
  styleUrl: './taywordle.scss',
})
export class Taywordle {}

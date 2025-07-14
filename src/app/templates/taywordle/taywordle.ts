import { Component, inject } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Status } from './components/status/status';
import { Form } from './components/form/form';

@Component({
  selector: 'app-taywordle',
  imports: [Sidebar, Header, MatDrawerContainer, MatDrawer, Status, Form],
  templateUrl: './taywordle.html',
  styleUrl: './taywordle.scss',
})
export class Taywordle {}

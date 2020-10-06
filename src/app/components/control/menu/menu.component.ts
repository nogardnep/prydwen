import { pages } from './../../../routerConfig';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

type MenuItem = {
  title: string;
  path: string;
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [
    {
      title: 'Sequences',
      path: pages.sequences,
    },
    {
      title: 'Patterns',
      path: pages.patterns,
    },
    {
      title: 'Resources',
      path: pages.resources,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClickItem(item: MenuItem): void {
    this.router.navigate(['/' + item.path]);
  }
}

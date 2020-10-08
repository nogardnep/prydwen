import { pages } from '../../../../config/pages';
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
      title: 'Song',
      path: pages.song.path,
    },
    {
      title: 'Sequences',
      path: pages.sequences.path,
    },
    {
      title: 'Patterns',
      path: pages.patterns.path,
    },
    {
      title: 'Resources',
      path: pages.resources.path,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onClickItem(item: MenuItem): void {
    this.router.navigate(['/' + item.path]);
  }

  isCurrentPage(item: MenuItem): boolean {
    return this.router.url === '/' + item.path;
  }
}

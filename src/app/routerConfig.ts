import { SequencesPageComponent } from './components/pages/sequences-page/sequences-page.component';
import { PatternsPageComponent } from './components/pages/patterns-page/patterns-page.component';
import { ResourcesPageComponent } from './components/pages/resources-page/resources-page.component';
import { ProjectLoaderPageComponent } from './components/pages/project-loader-page/project-loader-page.component';
import { IndexPageComponent } from './components/pages/index-page/index-page.component';
import { Routes } from '@angular/router';

export const pages = {
  index: '',
  patterns: 'patterns',
  sequences: 'sequences',
  projectLoader: 'project-loader',
  resources: 'resources',
};

export const appRoutes: Routes = [
  {
    path: pages.index,
    component: IndexPageComponent,
  },
  {
    path: pages.patterns,
    component: PatternsPageComponent,
  },
  {
    path: pages.sequences,
    component: SequencesPageComponent,
  },
  {
    path: pages.projectLoader,
    component: ProjectLoaderPageComponent,
  },
  {
    path: pages.resources,
    component: ResourcesPageComponent,
  },
];

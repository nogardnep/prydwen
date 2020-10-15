import { SequencePageComponent } from './components/pages/sequence-page/sequence-page.component';
import { TracksPageComponent } from './components/pages/tracks-page/tracks-page.component';
import { SongPageComponent } from './components/pages/song-page/song-page.component';
import { ConfigurationPageComponent } from './components/pages/configuration-page/configuration-page.component';
import { SequencesPageComponent } from './components/pages/sequences-page/sequences-page.component';
import { PatternsPageComponent } from './components/pages/patterns-page/patterns-page.component';
import { ResourcesPageComponent } from './components/pages/resources-page/resources-page.component';
import { ProjectLoaderPageComponent } from './components/pages/project-loader-page/project-loader-page.component';
import { IndexPageComponent } from './components/pages/index-page/index-page.component';
import { Routes } from '@angular/router';
import { pages } from '../config/pages';

export const appRoutes: Routes = [
  {
    path: pages.index.path,
    component: IndexPageComponent,
  },
  {
    path: pages.song.path,
    component: SongPageComponent,
  },
  {
    path: pages.sequences.path,
    component: SequencesPageComponent,
  },
  {
    path: pages.sequence.path,
    component: SequencePageComponent,
  },
  {
    path: pages.patterns.path,
    component: PatternsPageComponent,
  },
  {
    path: pages.projectLoader.path,
    component: ProjectLoaderPageComponent,
  },
  {
    path: pages.tracks.path,
    component: TracksPageComponent,
  },
  {
    path: pages.resources.path,
    component: ResourcesPageComponent,
  },
  {
    path: pages.configuration.path,
    component: ConfigurationPageComponent,
  },
];

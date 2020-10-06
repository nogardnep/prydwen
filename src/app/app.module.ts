import { PositionComponent } from './components/utils/position/position.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/control/menu/menu.component';
import { ProjectComponent } from './components/edition/project/project.component';
import { SequenceComponent } from './components/edition/sequence/sequence.component';
import { IndexPageComponent } from './components/pages/index-page/index-page.component';
import { PatternsPageComponent } from './components/pages/patterns-page/patterns-page.component';
import { ProjectLoaderPageComponent } from './components/pages/project-loader-page/project-loader-page.component';
import { ResourcesPageComponent } from './components/pages/resources-page/resources-page.component';
import { SequencesPageComponent } from './components/pages/sequences-page/sequences-page.component';
import { ParameterEditorComponent } from './components/parameters/parameter-editor/parameter-editor.component';
import { ParameterViewerComponent } from './components/parameters/parameter-viewer/parameter-viewer.component';
import { ParametersEditorComponent } from './components/parameters/parameters-editor/parameters-editor.component';
import { AudioResourceComponent } from './components/resources/audio-resource/audio-resource.component';
import { ResourcesComponent } from './components/resources/resources/resources.component';
import { AudioComponent } from './components/utils/audio/audio.component';
import { LoadingComponent } from './components/utils/loading/loading.component';
import { TimeSignatureComponent } from './components/utils/time-signature/time-signature.component';
import { FilenamePipe } from './pipes/filename.pipe';
import { appRoutes } from './routerConfig';
import { SequencerPlayerComponent } from './components/control/sequencer-player/sequencer-player.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    ResourcesComponent,
    AudioResourceComponent,
    ProjectComponent,
    FilenamePipe,
    AudioComponent,
    ProjectLoaderPageComponent,
    ResourcesPageComponent,
    MenuComponent,
    LoadingComponent,
    PatternsPageComponent,
    SequencesPageComponent,
    SequenceComponent,
    ParameterEditorComponent,
    ParameterViewerComponent,
    ParametersEditorComponent,
    TimeSignatureComponent,
    SequencerPlayerComponent,
    PositionComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

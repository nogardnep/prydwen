import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appRoutes } from './routerConfig';
import { PositionComponent } from './components/utils/position/position.component';
import { MenuComponent } from './components/control/menu/menu.component';
import { ProjectComponent } from './components/control/project/project.component';
import { IndexPageComponent } from './components/pages/index-page/index-page.component';
import { PatternsPageComponent } from './components/pages/patterns-page/patterns-page.component';
import { ProjectLoaderPageComponent } from './components/pages/project-loader-page/project-loader-page.component';
import { ResourcesPageComponent } from './components/pages/resources-page/resources-page.component';
import { SequencesPageComponent } from './components/pages/sequences-page/sequences-page.component';
import { ParameterEditorComponent } from './components/parameters/parameter-editor/parameter-editor.component';
import { ParameterViewerComponent } from './components/parameters/parameter-viewer/parameter-viewer.component';
import { ParametersEditorComponent } from './components/parameters/parameters-editor/parameters-editor.component';
import { AudioResourceComponent } from './components/resources/audio-resource/audio-resource.component';
import { AudioComponent } from './components/utils/audio/audio.component';
import { LoadingComponent } from './components/utils/loading/loading.component';
import { TimeSignatureComponent } from './components/utils/time-signature/time-signature.component';
import { FilenamePipe } from './pipes/filename.pipe';
import { SequencerPlayerComponent } from './components/control/sequencer-player/sequencer-player.component';
import { PatternComponent } from './components/edition/pattern/pattern.component';
import { SequenceEditorComponent } from './components/edition/sequence-editor/sequence-editor.component';
import { PatternEditorComponent } from './components/edition/pattern-editor/pattern-editor.component';
import { SequencePatternsViewerComponent } from './components/viewers/sequence-patterns-viewer/sequence-patterns-viewer.component';
import { SequencesViewerComponent } from './components/viewers/sequences-viewer/sequences-viewer.component';
import { SequenceViewComponent } from './components/viewers/sequence-view/sequence-view.component';
import { SequencePatternViewComponent } from './components/viewers/sequence-pattern-view/sequence-pattern-view.component';
import { ResourcesViewerComponent } from './components/viewers/resources-viewer/resources-viewer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SequenceSelectorComponent } from './components/control/sequence-selector/sequence-selector.component';
import { ProjectHeaderComponent } from './components/sections/project-header/project-header.component';
import { ConfigurationPageComponent } from './components/pages/configuration-page/configuration-page.component';
import { ConfigurationComponent } from './components/control/configuration/configuration.component';
import { GlobalHeaderComponent } from './components/sections/global-header/global-header.component';
import { SongPageComponent } from './components/pages/song-page/song-page.component';
import { SongPartsViewerComponent } from './components/viewers/song-parts-viewer/song-parts-viewer.component';
import { SongPartViewComponent } from './components/viewers/song-part-view/song-part-view.component';
import { SongPartEditorComponent } from './components/edition/song-part-editor/song-part-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
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
    ParameterEditorComponent,
    ParameterViewerComponent,
    ParametersEditorComponent,
    TimeSignatureComponent,
    SequencerPlayerComponent,
    PositionComponent,
    PatternComponent,
    SequenceEditorComponent,
    PatternEditorComponent,
    SequencePatternsViewerComponent,
    SequencesViewerComponent,
    SequenceViewComponent,
    SequencePatternViewComponent,
    ResourcesViewerComponent,
    SequenceSelectorComponent,
    ProjectHeaderComponent,
    ConfigurationPageComponent,
    ConfigurationComponent,
    GlobalHeaderComponent,
    SongPageComponent,
    SongPartsViewerComponent,
    SongPartViewComponent,
    SongPartEditorComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
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

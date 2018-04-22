import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StarlordMaterialModule} from '../material';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {SaveTokenComponent} from '../domain/tokenize/save-token.component';
import {SlackService} from '../domain/read-slack/slack.service';
import {TranslationService} from '../domain/translate-data/translation.service';
import {StarCounterService} from '../domain/count-stars/star-counter.service';

@NgModule({
    declarations: [
        AppComponent,
        SaveTokenComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        StarlordMaterialModule,
        HttpClientModule
    ],
    providers: [
        SlackService,
        TranslationService,
        StarCounterService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import {CommonModule} from '@angular/common';
import {
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {A11yModule} from '@angular/cdk/a11y';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {NgModule} from '@angular/core';

const MATERIAL_MODULES = [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTableModule,

    // These modules include providers.
    A11yModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    OverlayModule,
    PlatformModule
];

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES
})
export class StarlordMaterialModule {
}

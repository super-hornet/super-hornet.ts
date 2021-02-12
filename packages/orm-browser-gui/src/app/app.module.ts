import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
    DuiAppModule,
    DuiButtonModule,
    DuiCheckboxModule,
    DuiDialogModule,
    DuiFormComponent,
    DuiIconModule,
    DuiIndicatorModule,
    DuiInputModule,
    DuiListModule,
    DuiRadioboxModule,
    DuiSelectModule,
    DuiSplitterModule,
    DuiTableModule,
    DuiTabsModule,
    DuiWindowModule
} from '@deepkit/desktop-ui';
import { OverlayModule } from '@angular/cdk/overlay';
import { DatabaseComponent } from './views/database.component';
import { DatabaseBrowserComponent } from './views/database-browser.component';
import { DatabaseGraphComponent } from './components/database-graph.component';
import { InputEditingComponent } from './components/edit/input.component';
import { StringInputComponent } from './components/edit/string-input.component';
import { DateInputComponent } from './components/edit/date-input.component';
import { CellComponent } from './components/cell/cell.component';
import { StringCellComponent } from './components/cell/string-cell.component';
import { DateCellComponent } from './components/cell/date-cell.component';
import { DatabaseBrowserListComponent } from './components/list.component';
import { ClassCellComponent } from './components/cell/class-cell.component';
import { ClassInputComponent } from './components/edit/class-input.component';
import { EnumCellComponent } from './components/cell/enum-cell.component';
import { EnumInputComponent } from './components/edit/enum-input.component';
import { DatabaseCommitComponent } from './views/database-commit.component';
import { FilterComponent, FilterItemComponent } from './components/filter.compoment';
import { JsonEditDialogComponent } from './components/dialog/json-edit-dialog.component';
import { ArrayInputComponent } from './components/edit/array-input.component';
import { ArrayCellComponent } from './components/cell/array-cell.component';
import { JsonInputComponent } from './components/edit/json-input.component';
import { JsonCellComponent } from './components/cell/json-cell.component';
import { BinaryInputComponent } from './components/edit/binary-input.component';
import { BinaryCellComponent } from './components/cell/binary-cell.component';
import { BrowserCellComponent } from './components/browser-cell.component';
import { DeepkitClient } from '@deepkit/rpc';
import { FormsModule } from '@angular/forms';
import { BrowserState } from './browser-state';
import { Registry } from './registry';
import { ControllerClient } from './client';
import { PropertyComponent } from './components/property.component';
import { DatabaseSeedComponent } from './components/database-seed.component';
import { FakerTypeDialogComponent } from './components/dialog/faker-type-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        DatabaseComponent,
        DatabaseBrowserComponent,
        DatabaseGraphComponent,
        InputEditingComponent,
        StringInputComponent,
        DateInputComponent,
        CellComponent,
        StringCellComponent,
        DateCellComponent,
        DatabaseBrowserListComponent,
        ClassCellComponent,
        ClassInputComponent,
        EnumCellComponent,
        EnumInputComponent,
        DatabaseCommitComponent,
        FilterComponent,
        FilterItemComponent,
        JsonEditDialogComponent,
        ArrayInputComponent,
        ArrayCellComponent,
        JsonInputComponent,
        JsonCellComponent,
        BinaryInputComponent,
        BinaryCellComponent,
        BrowserCellComponent,
        PropertyComponent,
        DatabaseSeedComponent,
        FakerTypeDialogComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        OverlayModule,
        DuiAppModule.forRoot(),
        DuiWindowModule.forRoot(),
        DuiDialogModule,

        DuiCheckboxModule,
        DuiButtonModule,
        DuiInputModule,
        DuiFormComponent,
        DuiRadioboxModule,
        DuiSelectModule,
        DuiIconModule,
        DuiListModule,
        DuiTableModule,
        DuiTabsModule,
        DuiSplitterModule,
        DuiIndicatorModule,
    ],
    providers: [
        BrowserState,
        Registry,
        ControllerClient,
        {
            provide: DeepkitClient,
            useFactory: () => new DeepkitClient('ws://' + ControllerClient.getServerHost())
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
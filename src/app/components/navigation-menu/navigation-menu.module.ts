import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationMenuComponent } from './navigation-menu.component';
import { PostEditorModule } from '../post-editor/post-editor.module';
import { ReportPostModule } from '../report-post/report-post.module';
import { RouterModule } from '@angular/router';
import { DeletePostModule } from '../delete-post/delete-post.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MenuItemComponent } from '../menu-item/menu-item.component';
@NgModule({
  declarations: [
    NavigationMenuComponent
  ],
  imports: [
    CommonModule,
    PostEditorModule,
    ReportPostModule,
    RouterModule,
    DeletePostModule,
    MatSidenavModule,
    MatListModule,
    MenuItemComponent
  ],
  exports: [
    NavigationMenuComponent
  ]
})
export class NavigationMenuModule { }

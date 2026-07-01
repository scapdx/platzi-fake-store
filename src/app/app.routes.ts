import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';
import { authGuard } from './core/auth.guard';
import { unsavedChangesGuard } from './core/unsaved-changes.guard';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { RecordFormComponent } from './pages/record-form/record-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      { path: 'products', component: ProductsComponent },
      {
        path: 'products/new',
        component: RecordFormComponent,
        canDeactivate: [unsavedChangesGuard],
        data: { entity: 'product', mode: 'create' }
      },
      {
        path: 'products/:id/edit',
        component: RecordFormComponent,
        canDeactivate: [unsavedChangesGuard],
        data: { entity: 'product', mode: 'edit' }
      },
      {
        path: 'products/:id/delete',
        component: RecordFormComponent,
        data: { entity: 'product', mode: 'delete' }
      },
      { path: 'categories', component: CategoriesComponent },
      {
        path: 'categories/new',
        component: RecordFormComponent,
        canDeactivate: [unsavedChangesGuard],
        data: { entity: 'category', mode: 'create' }
      },
      {
        path: 'categories/:id/edit',
        component: RecordFormComponent,
        canDeactivate: [unsavedChangesGuard],
        data: { entity: 'category', mode: 'edit' }
      },
      {
        path: 'categories/:id/delete',
        component: RecordFormComponent,
        data: { entity: 'category', mode: 'delete' }
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

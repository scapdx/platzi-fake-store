import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from './models';

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  return component.canDeactivate();
};

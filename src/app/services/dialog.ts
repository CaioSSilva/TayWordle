import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class Dialog {
  readonly dialog = inject(MatDialog);

  openDialog(component: any, config: any) {
    return this.dialog.open(component, config);
  }

  closeDialog() {
    return this.dialog.closeAll();
  }

  isOpen(id: string) {
    return this.dialog.getDialogById(id)?.getState() === 0;
  }
}

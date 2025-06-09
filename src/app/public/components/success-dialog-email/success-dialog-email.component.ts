import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-success-dialog-email',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './success-dialog-email.component.html',
  styleUrls: ['./success-dialog-email.component.css']
})
export class SuccessDialogEmailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { messageKey: string }) {}
}

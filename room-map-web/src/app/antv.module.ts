import { NgModule } from '@angular/core';

import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

import { IconDefinition } from '@ant-design/icons-angular';
import { HomeOutline } from '@ant-design/icons-angular/icons';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

const ngZorroConfig: NzConfig = {};

const icons: IconDefinition[] = [HomeOutline];

@NgModule({
  imports: [NzIconModule.forRoot(icons)],
  exports: [
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTagModule,
    NzIconModule,
    NzDescriptionsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
})

export class AntvModule {}

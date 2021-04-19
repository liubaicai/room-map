import { Component, OnInit, ViewChild } from '@angular/core';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  allCount: number = 0;
  total: number = 0;
  page: number = 1;
  size: number = 10;
  tableLoading: boolean = false;
  filters: {} = {
  };
  rooms: [] = [];
  expandSet = new Set<number>();
  listOfDistrict: string[] = [
    '东城',
    '西城',
    '朝阳',
    '海淀',
    '丰台',
    '石景山',
    '通州',
    '昌平',
    '大兴',
    '亦庄开发区',
    '顺义',
    '房山',
    '门头沟',
    '平谷',
    '怀柔',
    '密云',
    '延庆',
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.getAllCount();
    this.getData();
  }

  async getData(page: number = 0) {
    this.tableLoading = true;
    try {
      if (page) {
        this.page = page;
      }
      const body = this.filters;
      const result = await this.api.search(
        {
          page: this.page - 1,
          size: this.size,
        },
        body
      );
      this.total = result?.data?.total || 0;
      this.rooms = result?.data?.content || [];
    } finally {
      setTimeout(() => {
        this.tableLoading = false;
      }, 100);
    }
  }

  async getAllCount() {
    this.tableLoading = true;
    const result = await this.api.count();
    this.allCount = result?.data || 0;
  }

  onPageChange(e) {
    this.getData(e);
  }

  toDetail(e) {
    window.open(e.url);
  }

  jsonStringify(obj) {
    return JSON.stringify(obj, null, 2)
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
}

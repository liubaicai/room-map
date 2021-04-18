import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  total: number = 0;
  page: number = 1;
  size: number = 10;
  filters: {} = {
    origin: '自如',
    max_price: '10000',
    in_position_district: ['丰台', '朝阳', '海淀', '大兴', '石景山'],
  };
  rooms: [] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.getData();
  }

  async getData(page: number = 0) {
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
  }

  onPageChange(e) {
    this.getData(e)
  }
}

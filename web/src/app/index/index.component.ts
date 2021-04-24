import { Component, OnInit } from '@angular/core';
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
  size: number = parseInt(localStorage.getItem('size'), 10) || 10;
  tableLoading: boolean = false;
  filters: {} = {};
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
  propsOfRoom: {} = {
    code: '房源编号',
    create_time: '创建时间',
    house_area: '面积',
    house_electric: '电',
    house_face: '朝向',
    house_floor: '楼层',
    house_gas: '燃气',
    house_heating: '供暖',
    house_layout: '户型',
    house_lift: '电梯',
    house_water: '水',
    id: 'ID',
    lease_type: '租赁方式',
    origin: '房屋来源',
    position_community: '地址',
    position_district: '区县',
    position_latitude: '维度',
    position_longitude: '经度',
    position_region: '街道/乡镇',
    price: '租金',
    price_agent: '中介费',
    price_deposit: '押金',
    price_per_sqm: '每平米租金',
    price_rent: '租金',
    price_service: '服务费',
    price_type: '支付方式',
    publish_time: '发布时间',
    tags: '标签',
    title: '标题',
    update_time: '更新时间',
    url: '源地址',
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.filters = JSON.parse(localStorage.getItem('filters')) || {};
  }

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

  onSearch() {
    this.onFiltersChange(this.filters);
    this.getData(1);
  }

  async getAllCount() {
    this.tableLoading = true;
    const result = await this.api.count();
    this.allCount = result?.data || 0;
  }

  onPageChange(e) {
    this.getData(e);
  }

  onPageSizeChange(e) {
    this.size = e;
    localStorage.setItem('size', e);
    this.getData(1);
  }

  toDetail(e) {
    window.open(e.url);
  }

  keysOfObject(obj) {
    return Object.keys(obj).filter((k) => k !== 'title' && k !== 'url');
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  onFiltersChange(e) {
    localStorage.setItem('filters', JSON.stringify(e));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  search(params, body): any {
    return this.http
      .post('/api/search', body, {
        params: params,
      })
      .toPromise();
  }

  count(): any {
    return this.http.get('/api/count').toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient,
              private store: Store<any>) { }

  public categories$ = this.store.select('appStore').map(wholeStore => wholeStore.categories);

  // -------------- app functions ---------------------

  public loadAllCategories() {
    this._getAllCategories().subscribe(data => {
      this.store.dispatch({type: 'GET_CATEGORIES', payload: data});
    });
  }

  public getCategory(catNum: string) {
    this.categories$.subscribe(data => {
      if (!data.length) {
        this.loadAllCategories();
      }
    });
    return this.categories$.map(categories => categories.filter(cat => cat._id === catNum)[0]);
  }

  public updateCategory(category) {
    this._updateCategory(category).subscribe(() => {
      this.store.dispatch({type: 'UPDATE_CATEGORY', payload: category});
    });
  }

  // ----------- back end functions --------------------

  private _getAllCategories() {
    const apiUrl = 'http://localhost:1980/categories';
    return this.http.get(apiUrl);
  }

  private _updateCategory(category) {
    const apiUrl = 'http://localhost:1980/category';
    return this.http.put(apiUrl, category);
  }

}

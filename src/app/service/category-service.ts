import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient,
              private store: Store<any>) { }

  public categories$: Observable<Category[]> = this.store.select('appStore').map(wholeStore => wholeStore.categories);

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

  public updateCategory(category: Category) {
    this._updateCategory(category).subscribe(() => {
      this.store.dispatch({type: 'UPDATE_CATEGORY', payload: category});
    });
  }

  public createCategory(category: Category) {
    this._createCategory(category).subscribe((data: any) => {
      this.store.dispatch({type: 'ADD_CATEGORY', payload: data.category});
    });
  }

  public deleteCategories(ids: string[]) {
    this._deleteCategories(ids).subscribe(() => {
      this.store.dispatch({type: 'DELETE_CATEGORIES', payload: ids});
    });
  }

  // ----------- back end functions --------------------

  private _getAllCategories() {
    const apiUrl = 'http://localhost:1980/categories';
    return this.http.get(apiUrl);
  }

  private _updateCategory(category: Category) {
    const apiUrl = 'http://localhost:1980/category';
    return this.http.put(apiUrl, category);
  }

  private _createCategory(category: Category) {
    const apiUrl = 'http://localhost:1980/category';
    return this.http.post(apiUrl, category);
  }

  private _deleteCategories(ids: string[]) {
    const apiUrl = 'http://localhost:1980/categories';
    const catToDelete = {filter: JSON.stringify(ids)};
    return this.http.delete(apiUrl, {params: catToDelete});
  }

  private _getFilteredCategories(filter: Object) {
    const apiUrl = 'http://localhost:1980/categories';
    const filterObject = {filter: JSON.stringify(filter)};
    return this.http.get(apiUrl, {params: filterObject});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class SettingsService {

  constructor(private http: HttpClient,
              private store: Store<any>) { }

  public settings$ = this.store.select('appStore').map(wholeStore => wholeStore.settings);

  // -------------- app functions ---------------------

  public loadAllSettings() {
    this._getAllSettings().subscribe(data => {
      this.store.dispatch({type: 'GET_SETTINGS', payload: data});
    });
  }

  public restoreSetting(setting) {
    this._getSetting(setting).subscribe(oldSetting => {
      this.store.dispatch({type: 'UPDATE_SETTING', payload: oldSetting});
    });
  }

  public restoreSettings() {
    this._getAllSettings().subscribe(oldSettings => {
      this.store.dispatch({type: 'UPDATE_SETTINGS', payload: oldSettings});
    });
  }

  public updateSetting(setting) {
    this._updateSetting(setting).subscribe(() => {
      this.store.dispatch({type: 'UPDATE_SETTING', payload: setting});
    });
  }

  public updateSettings(settings: any[]) {
    this._updateSettings(settings).subscribe(() => {
      this.store.dispatch({type: 'UPDATE_SETTINGS', payload: settings});
    });
  }

  public createSetting(setting) {
    this._createSetting(setting).subscribe((data: any) => {
      this.store.dispatch({type: 'ADD_SETTING', payload: data.setting});
    });
  }

  public deleteSetting(setting) {
    this._deleteSetting(setting).subscribe(() => {
      this.store.dispatch({type: 'DELETE_SETTING', payload: setting});
    });
  }
  // ----------- back end functions --------------------
  private _getSetting(setting) {
    const apiUrl = 'http://localhost:1980/setting';
    return this.http.get(apiUrl, {params: {_id: setting._id}});
  }

  private _getAllSettings() {
    const apiUrl = 'http://localhost:1980/settings';
    return this.http.get(apiUrl);
  }

  private _updateSetting(setting) {
    const apiUrl = 'http://localhost:1980/setting';
    return this.http.put(apiUrl, setting);
  }

  private _updateSettings(settings) {
    const apiUrl = 'http://localhost:1980/settings';
    return this.http.put(apiUrl, settings);
  }

  private _createSetting(setting) {
    const apiUrl = 'http://localhost:1980/setting';
    return this.http.post(apiUrl, setting);
  }

  private _deleteSetting(setting) {
    const apiUrl = 'http://localhost:1980/setting';
    return this.http.delete(apiUrl, {params: {_id: setting._id}});
  }

}

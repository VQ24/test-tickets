import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { UserSettings } from '../models/settings';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {

  constructor(private http: HttpClient,
              private store: Store<any>) { }

  public settings$: Observable<UserSettings[]> = this.store.select('appStore').map(wholeStore => wholeStore.settings);

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

  public updateSetting(setting: UserSettings) {
    this._updateSetting(setting).subscribe(() => {
      this.store.dispatch({type: 'UPDATE_SETTING', payload: setting});
    });
  }

  public updateSettings(settings: UserSettings[]) {
    this._updateSettings(settings).subscribe(() => {
      this.store.dispatch({type: 'UPDATE_SETTINGS', payload: settings});
    });
  }

  public createSetting(setting: UserSettings) {
    this._createSetting(setting).subscribe((data: any) => {
      this.store.dispatch({type: 'ADD_SETTING', payload: data.setting});
    });
  }

  public deleteSetting(setting: UserSettings) {
    this._deleteSetting(setting).subscribe(() => {
      this.store.dispatch({type: 'DELETE_SETTING', payload: setting});
    });
  }
  // ----------- back end functions --------------------
  private _getSetting(setting: UserSettings) {
    const apiUrl = 'http://localhost:1980/setting';
    return this.http.get(apiUrl, {params: {_id: setting._id}});
  }

  private _getAllSettings() {
    const apiUrl = 'http://localhost:1980/settings';
    return this.http.get(apiUrl);
  }

  private _updateSetting(setting: UserSettings) {
    const apiUrl = 'http://localhost:1980/setting';
    return this.http.put(apiUrl, setting);
  }

  private _updateSettings(settings: UserSettings[]) {
    const apiUrl = 'http://localhost:1980/settings';
    return this.http.put(apiUrl, settings);
  }

  private _createSetting(setting: UserSettings) {
    const apiUrl = 'http://localhost:1980/setting';
    return this.http.post(apiUrl, setting);
  }

  private _deleteSetting(setting: UserSettings) {
    const apiUrl = 'http://localhost:1980/setting';
    return this.http.delete(apiUrl, {params: {_id: setting._id}});
  }

}

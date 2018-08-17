import { Component, ViewChild, OnInit } from '@angular/core';
import { SettingsService } from '../service/settings-service';

@Component({
  selector: 'app-settings-page',
  styleUrls: ['./settings-page.component.css'],
  templateUrl: './settings-page.component.html',
})

export class SettingsPageComponent implements OnInit {

  @ViewChild('modalDeleteSetting') public deleteModalWindow;
  @ViewChild('modalEditSettingName') public editNameModalWindow;
  @ViewChild('modalNewSettingName') public newSettingModalWindow;

  constructor ( private service: SettingsService) {}

  public settings;

  public ngOnInit () {
    this.service.settings$.subscribe(data => {
      if (!data || !data.length) { this.service.loadAllSettings(); }
      this.settings = data;
    });
  }

  public collapseAccordion(setting) {
    this.settings.forEach((stng: any) => {
      stng.showContent = stng._id === setting._id ? !stng.showContent : false;
    });
  }

  public setDefault(setting) {
    this.settings.forEach((stng: any) => {
      stng.default = stng._id === setting._id ? true : false;
    });
    event.stopPropagation();
  }

  public possibleToSave(setting): boolean {
    return setting.filterSettings.randomSection.loadRandom.numberOfTickets > 0;
  }

  public onDeleteButtonClick(setting) {
    this.deleteModalWindow.open(setting, 'delete category');
    event.stopPropagation();
  }

  public onEditButtonClick(setting) {
    this.editNameModalWindow.open(setting, 'name edit');
    event.stopPropagation();
  }

  public onAddSettingButtonClick(defaultSetting) {
    const newSetting = Object.assign({}, defaultSetting, {name: 'My setting'});
    delete newSetting._id;
    this.newSettingModalWindow.open(newSetting, 'name edit');
    event.stopPropagation();
  }

  public onDelete(setting) {
    if (setting.default) {
      this.setDefault(this.settings[0]);
    }
    this.service.deleteSetting(setting);
    console.log(setting.name + ' deleted');
  }

  public onEditSettingName(setting) {
    if (setting.showContent) {
      delete setting.showContent;
    }
    this.service.updateSetting(setting);
    console.log(setting.name + ' edited');
  }

  public saveAllSettings() {
    console.log('all settings saved');
  }

  public saveSetting(setting) {
    if (setting.showContent) {
      delete setting.showContent;
    }
    this.service.updateSetting(setting);
    console.log(setting.name + ' saved');
  }

  public restoreSetting(setting) {
    console.log(setting.name + ' restored');
  }

  public addNewSetting(setting) {
    if (setting.showContent) {
      delete setting.showContent;
    }
    this.service.createSetting(setting);
    console.log('new setting added');
  }

}

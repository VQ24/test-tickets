export interface FilterSettings {
  categoriesSection: {
    loadAllOnOpenIfListIsEmpty: boolean,
    hideContent: boolean
  };
  tagSection: {
    hideContent: boolean
  };
  randomSection: {
    hideContent: boolean,
    loadRandom: {
      on: boolean,
      numberOfTickets: number
    }
  };
}

export interface UserSettings {
  _id: string;
  name: string;
  default: boolean;
  filterSettings: FilterSettings;
}

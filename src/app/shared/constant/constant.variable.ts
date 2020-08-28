export class AppConstants {
  public static get AuthToken(): string { return 'auth_token'; }
  public static get Profile(): string { return 'profile'; }
  public static get DebounceTime(): number { return 1000; }
  public static get ImageSize(): number { return 2097152; } // 2MB
  public static get IntervalTime(): number { return 30000; }
  public static get All(): string { return 'all'; }
  public static get TemplateName(): string { return 'templateName'; }
  public static get SelectedTab(): string { return 'selectedTab'; }
  public static get RedirectUrl(): string { return 'redirectUrl'; }
  public static get RateLocale(): string { return 'en-GB'; }
  public static get RateDecimal(): string { return '4.0-0'; }
  public static get DashboardSearchFilters(): any {
    return {
      partNumber: 'partNumber',
      equipment: 'equipment',
      billOfMaterial: 'billOfMaterial',
      documentation: 'documentation',
      rentalRegistry: 'rentalRegistry',
      rentalContract: 'rentalContract'
    };
  }
}

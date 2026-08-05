export class SurveyStationCard {
  constructor(private station: SurveyStation) {}
  render(): string {
    return `<div class="station-card"><h4>${this.station.code}</h4><p>الارتفاع: ${this.station.elevation}m</p></div>`;
  }
}
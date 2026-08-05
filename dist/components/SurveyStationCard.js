export class SurveyStationCard {
    station;
    constructor(station) {
        this.station = station;
    }
    render() {
        return `<div class="station-card"><h4>${this.station.code}</h4><p>الارتفاع: ${this.station.elevation}m</p></div>`;
    }
}
//# sourceMappingURL=SurveyStationCard.js.map
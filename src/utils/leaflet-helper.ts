export function toggleMapLayer<T extends { addTo: Function; remove: Function }>(layer: T, map: any, show: boolean): void {
  show ? layer.addTo(map) : layer.remove();
}
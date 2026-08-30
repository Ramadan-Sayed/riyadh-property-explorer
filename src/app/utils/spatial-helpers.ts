// الدالة تضمن تفادي القسمة على صفر أو القيم غير المحددة
export function calculatePricePerSqm(price: number | undefined, area: number | undefined): number | null {
  if (!price || !area || area <= 0) {
    return null;
  }
  return Number((price / area).toFixed(2));
}
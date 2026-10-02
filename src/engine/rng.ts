// A simple seeded PRNG (Mulberry32)
export function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export class RNG {
  private rng: () => number;
  
  constructor(seed: number) {
    this.rng = mulberry32(seed);
  }
  
  next(): number {
    return this.rng();
  }
  
  nextInt(min: number, max: number): number {
    return Math.floor(this.rng() * (max - min + 1)) + min;
  }
}

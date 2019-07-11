interface SphereFn {
  (): void;
}
interface TranslateFn {
  (x: number, y: number, z: number): void;
}
interface FillStrFn {
  (r: number, g: number, b: number): void;
  (color: string): void;
}
interface SinFn {
  (x: number): number;
}
interface RandomFn {
  (): number;
}
interface FloorFn {
  (x: number): number;
}
declare function sphere(r?: number): SphereFn;
declare const translate: TranslateFn;
declare const fill: FillStrFn;
declare const sin: SinFn;
declare const random: RandomFn;
declare const floor: FloorFn;

interface API {
  sphere: SphereFn;
  translate: TranslateFn;
  fill: FillStrFn;
  sin: SinFn;
  random: RandomFn;
  floor: FloorFn;
}

interface Window {
  setup(): void;
  draw(): void;
}

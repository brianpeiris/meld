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
interface ApplyMatrixFn {
  (m: any): void;
}
interface ResetMatrixFn {
  (): void;
}
interface VoidFn {
  (): void;
}
declare function sphere(r?: number): SphereFn;
declare const translate: TranslateFn;
declare const fill: FillStrFn;
declare const sin: SinFn;
declare const random: RandomFn;
declare const floor: FloorFn;
declare const applyMatrix: ApplyMatrixFn;
declare const resetMatrix: ResetMatrixFn;
declare const leftControllerMatrix: any;
declare const rightControllerMatrix: any;
declare const lights: VoidFn;

interface API {
  sphere: SphereFn;
  translate: TranslateFn;
  fill: FillStrFn;
  sin: SinFn;
  random: RandomFn;
  floor: FloorFn;
  applyMatrix: ApplyMatrixFn;
  resetMatrix: ResetMatrixFn;
  leftControllerMatrix: any;
  rightControllerMatrix: any;
  lights: VoidFn;
}

interface Window {
  setup(): void;
  draw(): void;
  leftControllerPressed(): void;
  leftControllerReleased(): void;
  rightControllerPressed(): void;
  rightControllerReleased(): void;
}

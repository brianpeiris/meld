type sphereFn = () => void;
type translateFn = (x: number, y: number, z: number) => void;
interface FillStrFn {
    (r:number, g:number, b:number): void;
    (color: string):void;
}
declare function sphere(): sphereFn;
declare const translate: translateFn;
declare const fill: FillStrFn;

interface API {
  sphere: sphereFn;
  translate: translateFn;
  fill: FillStrFn
}

interface Window {
  setup(): void;
  draw(): void;
}

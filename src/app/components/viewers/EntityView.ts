export interface EntityView {
  minNum: number;
  maxNum: number;

  onClickSelect(): void;
  onClickRemove(): void;
  onChangeNum(value: string): void;
  isSelected(): boolean;
  makeIdFor(label: string): string;
}

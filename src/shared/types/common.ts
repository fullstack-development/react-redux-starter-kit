export interface IPaginationState {
  page: number;
  totalPages: number;
}

export type NotificationKind = 'error' | 'info';

export interface INotification {
  kind: NotificationKind;
  text: string;
}

type ValueFormatter<T> = (x: T) => any;
export type KeysToValuesFormattersMap<T> = Partial<{[K in keyof T]: ValueFormatter<T[K]>}>;

export interface IPaginationState {
  page: number;
  totalPages: number;
}

export type NotificationKind = 'error' | 'info';

export interface INotification {
  kind: NotificationKind;
  text: string;
}

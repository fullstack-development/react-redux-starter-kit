export type NotificationKind = 'error' | 'info';

export interface INotification {
  kind: NotificationKind;
  text: string;
}

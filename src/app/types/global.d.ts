interface GtagEventParameters {
  'event_category'?: string;
  'event_label'?: string;
  'value'?: number;
  [key: string]: string | number | undefined;
}

declare function gtag(
  command: 'event',
  eventName: string,
  eventParameters?: GtagEventParameters
): void;

declare function gtag(
  command: 'js' | 'config',
  configValue: string,
  additionalConfig?: Record<string, string | number | boolean>
): void;

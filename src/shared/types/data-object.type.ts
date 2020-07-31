// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataObject<T = any> = { [P in keyof T]: T[P] };

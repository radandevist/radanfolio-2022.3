interface Window {
  AdProvider: any;
  gtag: any;
}

declare var AdProvider: any;

// type ObjectWithId = { id: string } & Record<string, any>;
type ObjectWithId = {
  id: string;
  [key: string]: any;
};

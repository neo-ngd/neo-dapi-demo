/// <reference types="react-scripts" />

import { Provider } from "@neongd/neo-provider";

declare global {
  interface Window {
    neo?: Provider;
    OneGate?: Provider;
    Vital?: Provider;
  }
}

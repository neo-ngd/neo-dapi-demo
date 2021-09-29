/// <reference types="react-scripts" />

import { INeoProvider } from "@neongd/neo-provider";

declare global {
  interface Window {
    neo?: INeoProvider;
  }
}

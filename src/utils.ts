import { wallet } from '@cityofzion/neon-js';

export function addressToScriptHash(address: string): string {
  return `0x${wallet.getScriptHashFromAddress(address)}`;
}

export function scriptHashToAddress(hash: string): string {
  return wallet.getAddressFromScriptHash(hash.replace(/0x/, ''));
}
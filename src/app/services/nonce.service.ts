import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NonceService {

  constructor() { }

  public generateNonce(): string {
    let nonce = '';
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._';

    for (let i = 0; i < 16; i++) {
      nonce += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    return nonce;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptionsArgs, RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class AuthHttp {

  private TOKEN_STORAGE = "AuthHttp.jwt";
  private TOKEN_HEADER = "Authorization";
  private TOKEN_PREFIX = "Bearer ";

  private jwt:JwtHelper;
  constructor(private http: Http) {
    this.jwt = new JwtHelper();
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.mergeToken(options);
    return this.http.get(url, options);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.mergeToken(options);
    return this.http.post(url, body, options);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.mergeToken(options);
    return this.http.put(url, body, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.mergeToken(options);
    return this.http.delete(url, options);
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.mergeToken(options);
    return this.http.patch(url, body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.mergeToken(options);
    return this.http.head(url, options);
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.mergeToken(options);
    return this.http.options(url, options);
  }

  private mergeToken(options?:RequestOptionsArgs){
    let token = this.getToken();
    if(token == null){
      return options;
    }

    if(options == null){
      options = new RequestOptions();
    }

    if(options.headers == null){
      options.headers = new Headers();
    }
    options.headers.set(this.TOKEN_HEADER, this.TOKEN_PREFIX + token);

    return options;
  }

  public getToken(): string {
    let token = localStorage.getItem(this.TOKEN_STORAGE);
    return token;
  }

  public setToken(token: string): void {
    if(token != null){
      localStorage.setItem(this.TOKEN_STORAGE, token);
    } else {
      localStorage.removeItem(this.TOKEN_STORAGE);
    }
  }

  public hasSession(): boolean {
    let token = this.getToken();
    if(token == null){
      return false;
    }

    return !this.jwt.isTokenExpired(token, 0);
  }

  public getSession(): any {
    if(this.hasSession()) {
      let sessionData:any = null;

      let token:string = this.getToken();
      let session:any = this.jwt.decodeToken(token);
      if( session != null &&
          session["data"] != undefined &&
          session["data"]["sub"] != undefined
      ){
        sessionData = session["data"]["sub"];
      }

      return sessionData;
    } else {
      return null;
    }
  }

}

/**
 * Helper class to decode and find JWT expiration.
 */

export class JwtHelper {

  public urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw 'Illegal base64url string!';
      }
    }
    return this.b64DecodeUnicode(output);
  }

  // credits for decoder goes to https://github.com/atk
  private b64decode(str: string): string {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output: string = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }

    for (
      // initialize result and counters
      let bc: number = 0, bs: any, buffer: any, idx: number = 0;
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }

  // https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), (c: any) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  public decodeToken(token: string): any {
    let parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    let decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(token: string): Date {
    let decoded: any;
    decoded = this.decodeToken(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token: string, offsetSeconds?: number): boolean {
    let date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date == null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}

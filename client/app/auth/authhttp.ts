import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptionsArgs, RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class AuthHttp {

  private TOKEN_STORAGE = "AuthHttp.jwt";
  private TOKEN_HEADER = "Authorization";
  private TOKEN_PREFIX = "Bearer ";

  constructor(private http: Http) {}

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.mergeToken(options);
    return this.http.get(url, options);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.mergeToken(options);
    console.log("headers", options.headers);
    return this.http.post(url, body, options);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.mergeToken(options);
    return this.http.put(url, body, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.mergeToken(options);
    return this.http.delete(url, options);
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.mergeToken(options);
    return this.http.patch(url, body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.mergeToken(options);
    return this.http.head(url, options);
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.mergeToken(options);
    return this.http.options(url, options);
  }

  private mergeToken(options?:RequestOptionsArgs){
    let jwt = localStorage.getItem(this.TOKEN_STORAGE);
    if(jwt == null){
      return options;
    }

    if(options == null){
      options = new RequestOptions();
    }

    if(options.headers == null){
      options.headers = new Headers();
    }
    options.headers.set(this.TOKEN_HEADER, this.TOKEN_PREFIX + jwt);

    return options;
  }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_STORAGE, token);
  }

}

import {Injectable} from "@angular/core";
import {Http, RequestOptions, RequestOptionsArgs, Response, Request, Headers, ConnectionBackend} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {ROUTE_NAMES} from "../../constants/route.constants";

@Injectable()
export class HttpInterceptor extends Http {

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
              private router: Router) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.get(url, this.getRequestOptionArgs(options))
      .catch((res: Response) => {
        this.handleError(res);
        return Observable.throw(res);
      });
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.post(url, body, this.getRequestOptionArgs(options))
      .catch((res: Response) => {
        this.handleError(res);
        return Observable.throw(res);
      });
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.put(url, body, this.getRequestOptionArgs(options))
      .catch((res: Response) => {
        this.handleError(res);
        return Observable.throw(res);
      });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.delete(url, this.getRequestOptionArgs(options))
      .catch((res: Response) => {
        this.handleError(res);
        return Observable.throw(res);
      });
  }

  private updateUrl(req: string) {
    return "http://localhost:8080/tarefas" + req;
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');

    return options;
  }

  private handleError(res: Response) {
    if (res.status === 401 || res.status === 403) {
      this.router.navigate([ROUTE_NAMES.LISTAR_TAREFAS]);
    }
  }
}

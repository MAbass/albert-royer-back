import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    // {
    //   statusCode: response.statusCode,
    //     message: data,
    //   timestamp: new Date().toISOString(),
    //   path: request.url
    // }

    return next.handle().pipe(
      map(function(data) {
        return {
          statusCode: response.statusCode,
          data: data,
          timestamp: new Date().toISOString(),
          path: request.url
        };
      })
    );
  }
}

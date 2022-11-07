import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
  message: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(message => {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        return {
          statusCode: res.statusCode,
          message,
          timestamp: new Date().toISOString(),
          path: req.url
        };
      })
    );
  }
}

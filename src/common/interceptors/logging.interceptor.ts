import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import * as chalk from "chalk";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getArgs()[3]) {
      const parentType = context.getArgs()[3]["parentType"];
      const fieldName = chalk
        .hex(process.env.PRIMARY_COLOR)
        .bold(`${context.getArgs()[3]["fieldName"]}`);
      return next.handle().pipe(
        tap(() => {
          Logger.debug(`⛩  ${parentType} » ${fieldName}`, "RestAPI");
        })
      );
    } else {
      const parentType = chalk
        .hex(process.env.PRIMARY_COLOR)
        .bold(`${context.getArgs()[0].route.path}`);
      const fieldName = chalk
        .hex(process.env.PRIMARY_COLOR)
        .bold(`${context.getArgs()[0].route.stack[0].method}`);
      return next.handle().pipe(
        tap(() => {
          Logger.debug(`⛩  ${parentType} » ${fieldName}`, "RestAPI");
        })
      );
    }
  }
}

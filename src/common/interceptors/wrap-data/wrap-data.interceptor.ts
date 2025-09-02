import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Logic to intercept Request data');

    return next.handle().pipe(
      map((data) => {
        console.log('Logic to intercept Response data');

        return { data };
      }),
    );
  }
}

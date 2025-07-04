import {HttpInterceptorFn} from '@angular/common/http';

/**
 * Interceptor for adding the authentication token to HTTP request headers.
 *
 * @summary
 * This interceptor retrieves a JWT token from `localStorage` and appends it to the `Authorization` header
 * of every outgoing HTTP request. If no token is found, the request is sent unmodified.
 *
 * @param request - The outgoing HTTP request
 * @param next - The next handler in the HTTP pipeline
 * @returns An Observable of the HTTP event stream with the token-modified (or unmodified) request
 */
export const authenticationInterceptor: HttpInterceptorFn = (
  request,
  next) => {
  /**
   * Retrieves the token from localStorage.
   */
  const token = localStorage.getItem('token');
  /**
   * Clones the request and appends the Authorization header if the token exists.
   * Otherwise, sends the original request as-is.
   */
  const handledRequest = token
    ? request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)})
    : request;
  /**
   * Logs the handled request to the console (useful for debugging).
   */
  console.log(handledRequest);
  /**
   * Returns the (modified or original) request to the next handler in the chain.
   */
  return next(handledRequest);
};

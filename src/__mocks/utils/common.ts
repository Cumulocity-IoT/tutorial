import { IFetchResponse, ISource } from '@c8y/client';
import { ApiCall, HttpHandler } from '@c8y/ngx-components/api';
import { DEFAULT_STATISTICS, HttpMethods, ResponseWithType } from '../mock.model';
import { from } from 'rxjs';

/**
 * Handles HTTP requests and provides mock responses based on the method type and URL path.
 * This function is primarily designed to be used in HTTP interceptors.
 *
 * @param req - The incoming HTTP request to be handled. This request should be of `ApiCall` type.
 * @param next - The next middleware function in the pipeline. If no matching handler is found, the request is passed to this next handler.
 * @param urlPath - The URL path which will be used to determine if the request should be handled. If the request URL includes this path, a handler will be searched for.
 * @param handlers - An object mapping HTTP methods to their respective handlers. These handlers are functions that accept a string argument (requestDescriptor), which is a combination of the request URL and any parameters or body, and return either a Promise or an object of `IFetchResponse` type.
 *
 * ```typescript
 * {
 *   POST: mockPOSTFunction,
 *   PUT: mockPUTFunction,
 *   GET: mockGETFunction,
 * }
 * ```
 *
 * If a handler is found for the HTTP method of the request, the handler function is called with the `requestDescriptor` as its argument.
 * @returns An Observable which will either contain the response from the matched handler function or, if no handler is matched, the result of the `next.handle(req)` call.
 *
 *
 * In the example below, all requests to inventory/managedObjects will pass through the interceptor.
 *
 * ```typescript
 * export class TestInterceptor implements HttpInterceptor {
 *   intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
 *     return handleRequest(req, next, 'inventory/managedObjects', {
 *       POST: this.mockPOST.bind(this),
 *       PUT: this.mockPUT.bind(this),
 *       GET: this.mockGET.bind(this)
 *     });
 *   }
 *
 *   mockPOST(_requestDescriptor: string) {
 *     return null;
 *   }
 *
 *   mockPUT(_requestDescriptor: string) {
 *    return null;
 *   }
 * }
 * ```
 */
export function handleRequest(
  req: ApiCall,
  next: HttpHandler,
  urlPath: string,
  handlers: {
    [method in HttpMethods]?: (
      requestDescriptor: string
    ) => Promise<IFetchResponse> | IFetchResponse;
  } = {}
): ReturnType<HttpHandler['handle']> {
  let requestDescriptor = req?.url;

  if (req?.options.params) {
    requestDescriptor += JSON.stringify(req.options.params);
  }

  if (req?.options?.body) {
    requestDescriptor += req.options.body;
  }

  const { method = 'GET' } = req?.options || {};

  if (requestDescriptor.includes(urlPath) && handlers[method]) {
    const statistics = generateStatistics(req?.options?.params);
    const mockedResponse = handlers[method](requestDescriptor, statistics);

    return mockedResponse ? from(Promise.resolve(mockedResponse)) : next.handle(req);
  }
  return next.handle(req);
}

export function generateId() {
  return Math.floor(Math.random() * 100000).toString();
}

export function getFakeSource(): ISource {
  return {
    id: generateId(),
    self: 'https://example.com/inventory/managedObjects/...'
  };
}

/**
 * A utility function for generating mock responses with predefined status, body content, and statistics.
 *
 * @function generateResponse
 *
 * @template T - The type of the data that will be included in the response body.
 *
 * @param bodyGenerator - A function that generates the content of the body of the response.
 * @param statistics - An optional parameter providing statistics for the response. Defaults to DEFAULT_STATISTICS.
 *
 * @returns A mock Response object with status 200 and a json method that resolves to a custom body object.
 */
export function generateResponse<T>(bodyGenerator: () => T, statistics = DEFAULT_STATISTICS) {
  const newResponse = new Response(null, {
    status: 200
  });
  newResponse.json = () =>
    Promise.resolve({
      ...bodyGenerator(),
      statistics
    });
  return newResponse as ResponseWithType<T & { statistics: typeof DEFAULT_STATISTICS }>;
}

/**
 * Generates statistics by merging default statistics with external statistics.
 *
 * @param params A `Record<string, any>` object containing optional statistics parameters such as `totalPages`, `pageSize`, and `currentPage`.
 *               - `totalPages` specifies the total number of pages.
 *               - `pageSize` specifies the number of items per page.
 *               - `currentPage` specifies the current page number.
 * @returns A statistics object that enables and handles pagination in the mocked response.
 */
function generateStatistics(params: Record<string, any>): typeof DEFAULT_STATISTICS {
  return {
    ...DEFAULT_STATISTICS,
    ...(params?.totalPages && { totalPages: params.totalPages }),
    ...(params?.pageSize && { pageSize: params.pageSize }),
    ...(params?.currentPage && { currentPage: params.currentPage }),
    ...(params?.currentPage && { next: params.currentPage + 1 })
  } as typeof DEFAULT_STATISTICS;
}

# Creating and Registering Interceptors
## Introduction

Interceptors are a feature used in HTTP communication to intercept and possibly alter HTTP requests or responses. They are powerful tools in managing communication with backend services and can be used to manipulate requests or simulate server responses.

## Why Use Interceptors

In our context, we aim to mock backend requests, particularly for unauthenticated users. This allows developers to simulate a variety of server responses without needing to communicate with the actual backend service, facilitating development and testing.

## Precaution

All files and logic within the __mocks folder are intended solely to enable Codex operation for unauthenticated users. This code should not be copied and should not be used as the basis for your own implementations.

## Adding an Interceptor

In this section, you will learn how to add your own interceptor in the tutorial application. The first decision you have to make is whether you want to create a global interceptor, which will act on all paths, or a scoped interceptor, which will act only on a selected path. They differ by the path parameter: global interceptors do not have a path specified.

Here's an example of how to register interceptors in the module's providers section:

```typescript
{
  provide: API_MOCK_CONFIG,
  useValue: {
    path: 'path-on-which-this-interceptor-is-tiggered',
    // The interceptors are sorted by their ID, so the scoped interceptors should be before the global ones.
    id: 'your-scoped-interceptor-name',
    mockService: ScopedInterceptor
  } as ApiMockConfig,
  multi: true
},
{
  provide: API_MOCK_CONFIG,
  useValue: {
    // The interceptors are sorted by their ID, so the scoped interceptors should be before the global ones.
    id: 'z-your-global-interceptor-name',
    mockService: GlobalInterceptor
  } as ApiMockConfig,
  multi: true
},

```

## Implementing the Interceptor

After deciding the type of interceptor, you should add it to the corresponding folder: scoped-mocks for scoped interceptors and global-mocks for global ones.

Here's a template for an interceptor that intercepts all requests sent to "inventory/managedObjects":

```typescript
export class BoilerplateInterceptor implements HttpInterceptor {
  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, 'inventory/managedObjects', {
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      GET: this.mockGET.bind(this)
    });
  }

  mockPOST(_requestDescriptor: string) {
    return null;
  }

  mockPUT(_requestDescriptor: string) {
    return null;
  }

  mockGET(_requestDescriptor: string) {
    return null;
  }
}
```

This interceptor will capture all POST, PUT and GET requests to "inventory/managedObjects". In this template, all mock functions simply return null — you should replace them with your own logic.

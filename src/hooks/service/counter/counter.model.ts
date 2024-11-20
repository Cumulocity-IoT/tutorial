/**
 * Declare the contract of the service that will be injected via `hookService` in an interface.
 * This interface will be used also to bind a type to the key used for providing and retrieving the service.
 * This interface should be declared in a module that is shared between modules that use the service and those that implement and inject it.
 */
export interface ICounterService {
  /**
   * Current counter state.
   */
  counter: number;
  /**
   * Increment counter value.
   */
  count: () => void;
}

declare global {
  /**
   * The `CumulocityServiceRegistry` namespaces is declared in `@c8y/ngx-components` as part of the global scope.
   * This allows you to augment the service registry by adding your typed extension keys.
   */
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CumulocityServiceRegistry {
    interface ExtensionKeys {
      /**
       * The extension key used for injecting and retrieving hooked services.
       * To provide a service with a key provide the service using `hookService`:
       *
       * ```typescript
       * @NgModule({
       *   providers: [hookService('counter', CounterService)]
       * })
       * ```
       *
       * In your client code you can use `ServiceRegistry` to retrieve an instance of the injected service:
       * ```typescript
       * ServiceRegistry.get(key)
       * ```
       */
      counter: ICounterService;
    }
  }
}

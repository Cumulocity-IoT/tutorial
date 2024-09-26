import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OptionsService } from '@c8y/ngx-components';
import { ApiService } from '@c8y/ngx-components/api';
import { filter } from 'rxjs/operators';
import { API_MOCK_CONFIG, ApiMockConfig } from './mock.model';
interface DebugData {
  text: string;
  content?: any;
}
@Injectable({ providedIn: 'root' })
export class MockService {
  constructor(
    @Inject(API_MOCK_CONFIG) private apiMocks,
    private apiService: ApiService,
    private router: Router,
    private options: OptionsService
  ) {
    if (this.options.get('noLogin', false)) {
      this.setupMocks();
    }
  }
  /**
   * Method responsible for setting up API mock behaviors.
   * It adds global interceptors and handles scoped interceptors for the current router URL.
   * If 'noLogin' option is true, it sets up scoped interceptors based on router navigation events and returns.
   * If 'noLogin' option is false, it sets up reactions for changes in the Mock API enabled state and
   * sets up scoped interceptors with filter based on router navigation events.
   */
  private setupMocks() {
    this.addGlobalInterceptors();
    this.handleScopedInterceptors(this.router.url);

    this.setupScopedInterceptorsOnNavigationEnd();
  }
  /**
   * Method responsible for handling scoped interceptors based on router navigation events.
   * It listens for NavigationEnd events, and calls handleScopedInterceptors method with current URL.
   */
  private setupScopedInterceptorsOnNavigationEnd() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.handleScopedInterceptors(event.url);
      });
  }
  /**
   * Registers global interceptors from the apiMocks configuration.
   *
   * This method filters apiMocks for entries with undefined path, considering them as global.
   * For each such entry, it creates an instance of the corresponding mock service and adds it as an interceptor.
   *
   * Note: The method is private and is likely to be used within the class internally.
   */
  private addGlobalInterceptors() {
    const mocksToRegister = this.apiMocks.filter((mock: ApiMockConfig) => mock.path === undefined);
    mocksToRegister.forEach((mock: ApiMockConfig) => {
      if (this.apiService.hasInterceptor(mock.id)) {
        return;
      }
      this.apiService.addInterceptor(new mock.mockService() as any, mock.id);
      this.logDebugInfo({ text: `Added global interceptor with id: ${mock.id}` }, mock.debug);
    });
  }
  /**
   * Handles registration and unregistration of scoped interceptors based on the provided URL.
   *
   * This method filters the apiMocks configuration for entries where the path is defined and included in the URL.
   * It registers these as scoped interceptors. It then filters for entries where the path is defined but not included in the URL,
   * and unregisters these interceptors.
   *
   * @param url The URL used to determine which interceptors to register and unregister.
   */
  private handleScopedInterceptors(url: string) {
    const mocksToRegister = [];
    const mocksToUnregister = [];

    this.apiMocks.forEach((mock: ApiMockConfig) => {
      if (!mock.path) {
        return;
      }

      if (url.includes(mock.path)) {
        mocksToRegister.push(mock);
      } else {
        mocksToUnregister.push(mock);
      }
    });

    this.applyMockConfig(mocksToRegister, mock => {
      this.logDebugInfo({ text: `Added scoped interceptor with id: ${mock.id}` }, mock.debug);
      this.apiService.addInterceptor(new mock.mockService() as any, mock.id);
    });

    this.applyMockConfig(mocksToUnregister, mock => {
      if (this.apiService.hasInterceptor(mock.id)) {
        this.logDebugInfo({ text: `Removed scoped interceptor with id: ${mock.id}` }, mock.debug);
        this.apiService.removeInterceptor(mock.id);
      }
    });
  }

  private applyMockConfig(mockConfigs: ApiMockConfig[], action: (mock: ApiMockConfig) => void) {
    mockConfigs.forEach(mock => action(mock));
  }

  private logDebugInfo(data: DebugData, show: boolean) {
    if (show) {
      // eslint-disable-next-line no-console
      data.content ? console.info(data.text, data.content) : console.info(data.text);
    }
  }
}

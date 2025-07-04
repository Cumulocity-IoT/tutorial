import { inject, Injectable } from '@angular/core';
import { NavigatorNode, NavigatorNodeFactory, PreviewService } from '@c8y/ngx-components';
import { distinctUntilChanged, map, Observable } from 'rxjs';

@Injectable()
export class ExampleCustomPreviewFeatureNavigationFactory implements NavigatorNodeFactory {
  private readonly previewFeatureService = inject(PreviewService);

  get(): Observable<NavigatorNode[]> {
    // For custom features we provide the label as they have no key
    const customFeatureLabel = 'Custom feature preview';
    return this.previewFeatureService.getState$(customFeatureLabel).pipe(
      distinctUntilChanged(),
      map(state => {
        if (state) {
          return [
            new NavigatorNode({
              priority: 100,
              path: 'hooks/preview-feature-custom',
              icon: 'science',
              label: 'Feature Preview Custom',
              parent: 'Hooks',
              preventDuplicates: true
            })
          ];
        }
        return [];
      })
    );
  }
}

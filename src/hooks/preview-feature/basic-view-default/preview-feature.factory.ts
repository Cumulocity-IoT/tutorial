import { inject, Injectable } from '@angular/core';
import { NavigatorNode, NavigatorNodeFactory, PreviewService } from '@c8y/ngx-components';
import { distinctUntilChanged, map, Observable } from 'rxjs';

@Injectable()
export class ExamplePreviewFeatureNavigationFactory implements NavigatorNodeFactory {
  private readonly previewFeatureService = inject(PreviewService);

  get(): Observable<NavigatorNode[]> {
    return this.previewFeatureService.getState$('preview-feature-key').pipe(
      distinctUntilChanged(),
      map(state => {
        if (state) {
          return [
            new NavigatorNode({
              priority: 100,
              path: 'hooks/preview-feature-default',
              icon: 'science',
              label: 'Preview Feature',
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

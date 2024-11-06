import { CanActivateFn, Router } from '@angular/router';

export const featureFlagGuard: CanActivateFn = (route, state) => {
  const featureFlag = localStorage.getItem('useSignals') === 'true';
  const isBoxSelectionRoute = state.url === '/';

  if (featureFlag && isBoxSelectionRoute) {
    return { 

      redirectTo: new Router().parseUrl("/"),
      queryParams: { useSignals: 'true' }
    };
  }
  return true;
};

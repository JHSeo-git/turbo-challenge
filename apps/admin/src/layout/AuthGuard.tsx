import React, { PropsWithChildren, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
// import { toRelativeUrl } from '@okta/okta-auth-js';
import { toRelativeUrl } from '@okta/okta-auth-js';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin,
      );
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (!authState || !authState?.isAuthenticated) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        wait a minute...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
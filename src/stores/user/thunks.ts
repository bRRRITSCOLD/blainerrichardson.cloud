// node_modules
import { from, interval, Observable, of, Subject } from 'rxjs';
import { catchError, concatMap, map, takeUntil, tap } from 'rxjs/operators';

// libraries
import { _ } from '../../lib/utils';

// services
import * as userService from '../../services/user';

// store specific
import type { UserStoreActionsInterface } from "./actions";

export interface UserStoreThunksInterface {
  // startChangingCircleText: (circleText) => void;
  // stopChangingCircleText: () => void;
  authenticateUser: (authenticateUserRequest: { username: string; password: string }) => void;
  startPollingRefreshUserToken: (startPollingRefreshUserTokenRequest: { jwt: string; }) => void;
  stopPollingRefreshUserToken: () => void;
}

export const createUserStoreThunks = (userStoreActions: UserStoreActionsInterface): UserStoreThunksInterface => {
  let refreshUserJWTUnsubscribe$: Subject<undefined>;
  let refreshUserJWT$: Observable<any>;
  // create the internal version of out
  // state polling
  const pollRefreshUserToken = (pollRefreshUserTokenRequest: {
    jwt: string;
  }) => {
    // create the unsubscribe for
    // our silent refresh user jwt
    // functionality
    refreshUserJWTUnsubscribe$ = new Subject();
    // start to silently refresh a
    // user's jwt every 10 mins
    refreshUserJWT$ = interval(600000).pipe(
      takeUntil(refreshUserJWTUnsubscribe$),
      concatMap((_: any) => from(userService.refreshUserToken({
        jwt: pollRefreshUserTokenRequest.jwt
      })).pipe(
        takeUntil(refreshUserJWTUnsubscribe$),
        map((refreshUserJWTResponse: { user: string; userToken: string }) => ({
          user: refreshUserJWTResponse.user,
          userToken: refreshUserJWTResponse.userToken,
        })),
        tap((response: { user: string; userToken: string }) => response),
        catchError(() => of('EMPTY')),
      )),
    );
  };

  const handlePollRefreshUserToken = (response) => {
    // set jwt
    userStoreActions.setJwt(response.userToken.token);

    // now unsubscribe to the response of the
    // call to refresh the user jwt every x seconds
    if (refreshUserJWTUnsubscribe$) {
      refreshUserJWTUnsubscribe$.next();
    }

    // start new supscription
    startPollRefreshUserToken({ jwt: response.userToken.token });
  };

  const startPollRefreshUserToken = (startPollRefreshUserTokenRequest: { jwt: string }) => {
    // deconstruct for ease
    const { jwt } = startPollRefreshUserTokenRequest;

    // indicate that we are now silently
    // polling to refresh our user token
    userStoreActions.setIsPollingRefreshUserToken(true);

    // start polling
    pollRefreshUserToken({
      jwt
    });

    // now subscribe to the response of the
    // call to refresh the user jwt every x seconds
    if (refreshUserJWT$) {
      // eslint-disable-next-line prefer-arrow-callback
      refreshUserJWT$.subscribe(handlePollRefreshUserToken);
    }
  };

  const stopPollRefreshUserToken = () => {
    console.log('userStoreThunks - stopPollingRefreshUserToken');
    // now unsubscribe to the response of the
    // call to refresh the user jwt every x seconds
    if (refreshUserJWTUnsubscribe$) {
      refreshUserJWTUnsubscribe$.next();
    }

    // set/indicate that we are done polling to refresh
    // a user's jwt silently without them knowing
    userStoreActions.setIsPollingRefreshUserToken(false);
  };

  return {
    authenticateUser: async (authenticateUserRequest) => {
      try {
        // deconstruct for ease
        const { username, password } = authenticateUserRequest;

        // indicate we do not have an error
        userStoreActions.setAuthenticateUserError(undefined);

        // indicate that we are sending an user
        userStoreActions.setIsAuthenticatingUser(true);

        const authenticateUserResponse = await userService.authenticateUser({
          username,
          password
        });

        // set store's user data
        userStoreActions.setUser(authenticateUserResponse.user);

        // set store's jwt token data
        userStoreActions.setJwt(authenticateUserResponse.userToken.token);

        // indicate that we are sending an user
        userStoreActions.setIsAuthenticatingUser(false);

        // return explictly to make sure
        // the closure closes
        return;
      } catch (err) {
        console.log(`authenticateUserError`, err);

        // indicate we have an error
        userStoreActions.setAuthenticateUserError(err);

        // indicate that we are sending an user
        userStoreActions.setIsAuthenticatingUser(false);

        // thow error explicitly
        throw err;
      }
    },
    startPollingRefreshUserToken: (startPollingRefreshUserTokenRequest: { jwt: string }) => {
      // deconstruct for ease
      const { jwt } = startPollingRefreshUserTokenRequest;
      
      startPollRefreshUserToken({ jwt });
    },
    stopPollingRefreshUserToken: () => {
      stopPollRefreshUserToken();
    }
  }
}

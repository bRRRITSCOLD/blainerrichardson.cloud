// node_modules
import { from, interval, Observable, of, Subject } from 'rxjs';
import { catchError, concatMap, map, takeUntil, tap } from 'rxjs/operators';

// libraries
import { _ } from '../../lib/utils';

// services
import * as userService from '../../services/user';

// store specific
import type { UserStoreActionsInterface } from "./actions";

export interface AuthenticatUserRequestInterface { username: string; password: string }

export interface RefreshUserTokenRequestInterface { jwt: string }

export interface StartPollingRefreshUserTokenRequestInterface { jwt: string }

export interface UserStoreThunksInterface {
  // startChangingCircleText: (circleText) => void;
  // stopChangingCircleText: () => void;
  authenticateUser: (authenticateUserRequest: AuthenticatUserRequestInterface) => Promise<void>;
  refreshUserToken: (refreshUserTokenRequest: RefreshUserTokenRequestInterface) => Promise<void>;
  startPollingRefreshUserToken: (startPollingRefreshUserTokenRequest: StartPollingRefreshUserTokenRequestInterface) => void;
  stopPollingRefreshUserToken: () => void;
}

export const createUserStoreThunks = (userStoreActions: UserStoreActionsInterface): UserStoreThunksInterface => {
  const userStoreThunks = {
    authenticateUser: async (authenticateUserRequest: AuthenticatUserRequestInterface) => {
      try {
        // deconstruct for ease
        const { username, password } = authenticateUserRequest;

        // indicate we do not have errors
        userStoreActions.setAuthenticateUserError(undefined);
        userStoreActions.setRefreshUserTokenError(undefined);

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
      }
    },
    refreshUserToken: async (refreshUserTokenRequest: RefreshUserTokenRequestInterface) => {
      try {
        // deconstruct for ease
        const { jwt } = refreshUserTokenRequest;

        // indicate we do not have an error
        userStoreActions.setRefreshUserTokenError(undefined);

        // indicate that we are sending an user
        userStoreActions.setIsRefreshingUserToken(true);

        const authenticateUserResponse = await userService.refreshUserToken({ jwt });

        // set store's jwt token data
        userStoreActions.setJwt(authenticateUserResponse.userToken.token);

        // indicate that we are sending an user
        userStoreActions.setIsRefreshingUserToken(false);

        // return explictly to make sure
        // the closure closes
        return;
      } catch (err) {
        console.log(`refreshUserTokenError`, err);

        // indicate we have an error
        userStoreActions.setRefreshUserTokenError(err);

        // reset jwt to empty to indicaate we are not authenticated
        userStoreActions.setJwt('');

        // indicate that we are sending an user
        userStoreActions.setIsRefreshingUserToken(false);
      }
    }
  } as UserStoreThunksInterface;

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
    refreshUserJWT$ = interval(840000).pipe(
      takeUntil(refreshUserJWTUnsubscribe$),
      concatMap((_: any) => {
        // indicate we do not have an error
        userStoreActions.setRefreshUserTokenError(undefined);

        // indicate that we are sending an user
        userStoreActions.setIsRefreshingUserToken(true);

        return from(userService.refreshUserToken({
          jwt: pollRefreshUserTokenRequest.jwt
        })).pipe(
          takeUntil(refreshUserJWTUnsubscribe$),
          map((refreshUserJWTResponse: { user: string; userToken: any }) => ({
            user: refreshUserJWTResponse.user,
            userToken: refreshUserJWTResponse.userToken,
          })),
          tap((response: { user: string; userToken: any }) => response),
          catchError((err) => {
            // indicate we have an error
            userStoreActions.setRefreshUserTokenError(err);

            // reset jwt to empty to indicate we are not authenticated
            userStoreActions.setJwt('');

            // indicate that we are sending an user
            userStoreActions.setIsRefreshingUserToken(false);
    
            // stop polling
            userStoreThunks.stopPollingRefreshUserToken();

            return of('EMPTY');
          }),
      )}),
    );
  };

  userStoreThunks.startPollingRefreshUserToken = (startPollingRefreshUserTokenRequest: StartPollingRefreshUserTokenRequestInterface) => {
    // deconstruct for ease
    const { jwt } = startPollingRefreshUserTokenRequest;

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

  const handlePollRefreshUserToken = (response) => {
    // set store's jwt token data
    userStoreActions.setJwt(response.userToken.token);

    // indicate that we are sending an user
    userStoreActions.setIsRefreshingUserToken(false);

    // now unsubscribe to the response of the
    // call to refresh the user jwt every x seconds
    if (refreshUserJWTUnsubscribe$) {
      refreshUserJWTUnsubscribe$.next();
    }

    // start new supscription
    userStoreThunks.startPollingRefreshUserToken({ jwt: response.userToken.token });
  };

  userStoreThunks.stopPollingRefreshUserToken = () => {
    console.log('userStoreThunks - stopPollingRefreshUserToken');
    // now unsubscribe to the response of the
    // call to refresh the user jwt every x seconds
    if (refreshUserJWTUnsubscribe$) {
      refreshUserJWTUnsubscribe$.next();
    }
    console.log('made it past unsubscribe');
    // set/indicate that we are done polling to refresh
    // a user's jwt silently without them knowing
    userStoreActions.setIsPollingRefreshUserToken(false);

    console.log('made it past setIsPollingRefreshUserToken');
  };
  
  return userStoreThunks;
}

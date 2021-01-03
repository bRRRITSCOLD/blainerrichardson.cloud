import { _ } from '../../lib/utils';
import type { UserStoreActionsInterface } from "./actions";

import * as userService from '../../services/user';

export interface UserStoreThunksInterface {
  // startChangingCircleText: (circleText) => void;
  // stopChangingCircleText: () => void;
  authenticateUser: (authenticateUserRequest: { username: string; password: string }) => void;
}

export const createUserStoreThunks = (userStoreActions: UserStoreActionsInterface): UserStoreThunksInterface => {
  // let changeCircleTextUnsubscribe$: Subject<undefined>;
  // let changeCircleText$: Observable<any>;

  // const startChangingCircleText = (circleText: string) => {
  //   // create unsubscribe so that
  //   // we may cancel/stop when needed
  //   changeCircleTextUnsubscribe$ = new Subject();
  //   // start the change of circle text
  //   changeCircleText$ = of(circleText).pipe(
  //     delay(300),
  //     takeUntil(changeCircleTextUnsubscribe$),
  //     tap((newCircleText: string) => newCircleText)
  //   );
  // };

  // const stopChangingCircleText = () => {
  //   // unsubscribe to the changing
  //   // circle text observable
  //   if (changeCircleTextUnsubscribe$) {
  //     changeCircleTextUnsubscribe$.next();
  //   }
  // };

  return {
    // startChangingCircleText: (circleText: string) => {
    //   // indicate that we are changing
    //   // or have started changing the
    //   // cirle text for the user
    //   userStoreActions.setIsChangingCircleText(true);
    //   // create observable and start subscription
    //   startChangingCircleText(circleText);
    //   // now subscribe to the subscription
    //   // and set a handler
    //   if (changeCircleText$) {
    //     changeCircleText$.subscribe({
    //       next: (newCircleText: string) => {
    //         // set the user's circle text
    //         // with the new circle text
    //         userStoreActions.setCircleText(newCircleText);
    //         // unsubscribe to the changing
    //         // circle text observable
    //         stopChangingCircleText();
    //         // indicate that we are not changing
    //         // the cirle text for the user
    //         userStoreActions.setIsChangingCircleText(false);
    //       },
    //       error: (error: string) => {
    //         // log error for conext
    //         console.log('change circle text error ', error);
    //         // set the user's circle text
    //         // with the new circle text
    //         userStoreActions.setCircleText(circleText);
    //         // unsubscribe to the changing
    //         // circle text observable
    //         stopChangingCircleText();
    //         // indicate that we are not changing
    //         // the cirle text for the user
    //         userStoreActions.setIsChangingCircleText(false);
    //       }
    //     });
    //   }
    // },
    // stopChangingCircleText: () => {
    //   // unsubscribe to the changing
    //   // circle text observable
    //   stopChangingCircleText();
    //   // indicate that we are not changing
    //   // the cirle text for the user
    //   userStoreActions.setIsChangingCircleText(false);
    // },
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
    }
  }
}
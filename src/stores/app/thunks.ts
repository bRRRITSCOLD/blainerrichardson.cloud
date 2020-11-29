import type { Writable } from "svelte/store";
import type { AppStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';
import { Observable, of, Subject } from "rxjs";
import { delay, takeUntil, tap } from "rxjs/operators";
import type { AppStoreActionsInterface } from "./actions";

export interface AppStoreThunksInterface {
  startChangingCircleText: (circleText) => void;
  stopChangingCircleText: () => void;
}

export const createAppStoreThunks = (appStoreActions: AppStoreActionsInterface): AppStoreThunksInterface => {
  let changeCircleTextUnsubscribe$: Subject<undefined>;
  let changeCircleText$: Observable<any>;

  const startChangingCircleText = (circleText: string) => {
    // create unsubscribe so that
    // we may cancel/stop when needed
    changeCircleTextUnsubscribe$ = new Subject();
    // start the change of circle text
    changeCircleText$ = of(circleText).pipe(
      delay(300),
      takeUntil(changeCircleTextUnsubscribe$),
      tap((newCircleText: string) => newCircleText)
    );
  };

  const stopChangingCircleText = () => {
    // unsubscribe to the changing
    // circle text observable
    if (changeCircleTextUnsubscribe$) {
      changeCircleTextUnsubscribe$.next();
    }
  };

  return {
    startChangingCircleText: (circleText: string) => {
      // indicate that we are changing
      // or have started changing the
      // cirle text for the app
      appStoreActions.setIsChangingCircleText(true);
      // create observable and start subscription
      startChangingCircleText(circleText);
      // now subscribe to the subscription
      // and set a handler
      if (changeCircleText$) {
        changeCircleText$.subscribe((newCircleText: string) => {
          // set the app's circle text
          // with the new circle text
          appStoreActions.setCircleText(newCircleText);
          // unsubscribe to the changing
          // circle text observable
          stopChangingCircleText();
          // indicate that we are not changing
          // the cirle text for the app
          appStoreActions.setIsChangingCircleText(false);
        });
      }
    },
    stopChangingCircleText: () => {
      // unsubscribe to the changing
      // circle text observable
      stopChangingCircleText();
      // indicate that we are not changing
      // the cirle text for the app
      appStoreActions.setIsChangingCircleText(false);
    }
  }
}
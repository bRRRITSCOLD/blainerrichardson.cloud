// node_modules
import { Observable, of, Subject } from "rxjs";
import { delay, takeUntil, tap } from "rxjs/operators";

// libraries
import { _ } from '../../lib/utils';

// store specific
import type { UiStoreActionsInterface } from "./actions";

export interface UiStoreThunksInterface {
  startChangingCircleText: (circleText) => void;
  stopChangingCircleText: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openEmailModal: () => void;
  closeEmailModal: () => void;
  openResumeModal: () => void;
  closeResumeModal: () => void;
  openAdminNavigationDrawer:() => void;
  closeAdminNavigationDrawer:() => void;
}

export const createUiStoreThunks = (uiStoreActions: UiStoreActionsInterface): UiStoreThunksInterface => {
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
      uiStoreActions.setIsChangingCircleText(true);
      // create observable and start subscription
      startChangingCircleText(circleText);
      // now subscribe to the subscription
      // and set a handler
      if (changeCircleText$) {
        changeCircleText$.subscribe({
          next: (newCircleText: string) => {
            // set the app's circle text
            // with the new circle text
            uiStoreActions.setCircleText(newCircleText);
            // unsubscribe to the changing
            // circle text observable
            stopChangingCircleText();
            // indicate that we are not changing
            // the cirle text for the app
            uiStoreActions.setIsChangingCircleText(false);
          },
          error: (error: string) => {
            // log error for conext
            console.log('change circle text error ', error);
            // set the app's circle text
            // with the new circle text
            uiStoreActions.setCircleText(circleText);
            // unsubscribe to the changing
            // circle text observable
            stopChangingCircleText();
            // indicate that we are not changing
            // the cirle text for the app
            uiStoreActions.setIsChangingCircleText(false);
          }
        });
      }
    },
    stopChangingCircleText: () => {
      // unsubscribe to the changing
      // circle text observable
      stopChangingCircleText();
      // indicate that we are not changing
      // the cirle text for the app
      uiStoreActions.setIsChangingCircleText(false);
    },
    openLoginModal: async () => {
      uiStoreActions.setIsLoginModalOpen(true);
    },
    closeLoginModal: async () => {
      uiStoreActions.setIsLoginModalOpen(false);
    },
    openEmailModal: async () => {
      uiStoreActions.setIsEmailModalOpen(true);
    },
    closeEmailModal: async () => {
      uiStoreActions.setIsEmailModalOpen(false);
    },
    openResumeModal: async () => {
      uiStoreActions.setIsResumeModalOpen(true);
    },
    closeResumeModal: async () => {
      uiStoreActions.setIsResumeModalOpen(false);
    },
    openAdminNavigationDrawer: async () => {
      uiStoreActions.setIsAdminNavigationDrawerOpen(true);
    },
    closeAdminNavigationDrawer: async () => {
      uiStoreActions.setIsAdminNavigationDrawerOpen(false);
    }
  }
}
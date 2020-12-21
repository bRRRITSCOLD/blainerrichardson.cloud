import type { Writable } from "svelte/store";
import type { AppStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';

export interface AppStoreActionsInterface {
  setCircleText: (circleText: string) => void;
  setIsChangingCircleText: (isChangingCircleText: boolean) => void;
  setIconLinks: (iconLinks: any[]) => void;
  setIsSendingEmail: (isSendingEmail: boolean) => void;
}

export const createAppStoreActions = (appStore: Writable<AppStoreStateInterface & object>): AppStoreActionsInterface => {

  return {
    setCircleText: (circleText: string) => {
      appStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { circleText }
        )
      });
    },
    setIsChangingCircleText: (isChangingCircleText: boolean) => {
      appStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isChangingCircleText }
        )
      });
    },
    setIconLinks: (iconLinks: any[]) => {
      appStore.update(state => {
        // first create a copy
        let newIconLinks = state.iconLinks.slice();
        // for each app group passed in - replace its
        // correlated self in the newIconLinks array
        for (const appGroup of iconLinks) {
          newIconLinks = _.replaceOne(
            { auditApp: appGroup.auditApp },
            newIconLinks,
            appGroup
          );
        }
        // return the new state
        return _.assign(
          {},
          state,
          { iconLinks: newIconLinks }
        )
      })
    },
    setIsSendingEmail: (isSendingEmail: boolean) => {
      appStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isSendingEmail }
        )
      });
    },
  }
}
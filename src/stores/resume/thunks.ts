// libraries
import { promiseUtils, _ } from '../../lib/utils';
import type { AnyObject } from '../../models/common';
import type { WorkExperienceInterface } from '../../models/resume';

// store specific
import type { ResumeStoreActionsInterface } from "./actions";

// services
import * as resumeServices from '../../services/resume';

export interface ResumeStoreThunksInterface {
  searchWorkExperiences: (searchWorkExperiencesRequest: { searchCriteria: AnyObject; searchOptions: { pageNumber: number; pageSize: number; } }) => void;
  putWorkExperiences: (putWorkExperiencesRequest: { jwt: string; workExperiences: WorkExperienceInterface[]; }) => void;
  deleteWorkExperiences: (deleteWorkExperiencesRequest: { jwt: string; workExperienceIds: string[]; }) => void;
}

export const createResumeStoreThunks = (resumeStoreActions: ResumeStoreActionsInterface): ResumeStoreThunksInterface => {

  return {
    searchWorkExperiences: async (_searchWorkExperiencesRequest: { searchCriteria: AnyObject; searchOptions: { pageNumber: number; pageSize: number; } }) => {
      try {
        // indicate we are loading and reset any old errors
        resumeStoreActions.setIsSearchingWorkExperiences(true);
        resumeStoreActions.setSearchWorkExperiencesError(undefined);
  
        // attempt to search system
        const [
          searchWorkExperiencesResponse
        ] = await promiseUtils.allSettled([
          resumeServices.searchWorkExperiences()
        ]);
        
        // if our call failed handle appropriately else move on
        if (searchWorkExperiencesResponse.status === 'rejected') {
          throw searchWorkExperiencesResponse.reason;
        }
  
        // store data and indicate we are no longer loading
        resumeStoreActions.setWorkExperiences(searchWorkExperiencesResponse.data.workExperiences);
        resumeStoreActions.setIsSearchingWorkExperiences(false);
  
        // return explicitly
        return;
      } catch (err) {
        // store error and indicate we are no longer loading
        resumeStoreActions.setSearchWorkExperiencesError(err);
        resumeStoreActions.setIsSearchingWorkExperiences(false);

        // return explicitly
        return;
      }
    },
    putWorkExperiences: async (putWorkExperiencesRequest: { jwt: string; workExperiences: WorkExperienceInterface[]; }) => {
      try {
        // deconstruct for ease
        const {
          jwt,
          workExperiences
        } = putWorkExperiencesRequest;

        console.log('putWorkExperiencesRequest', putWorkExperiencesRequest);
        // indicate we are loading and reset any old errors
        resumeStoreActions.setIsPuttingWorkExperiences(true);
        resumeStoreActions.setPuthWorkExperiencesError(undefined);
  
        // attempt to search system
        const [
          putWorkExperiencesResponse
        ] = await promiseUtils.allSettled([
          resumeServices.putWorkExperiences({ jwt, workExperiences })
        ]);
        
        // if our call failed handle appropriately else move on
        if (putWorkExperiencesResponse.status === 'rejected') {
          throw putWorkExperiencesResponse.reason;
        }
  
        // store data and indicate we are no longer loading
        for (const workExperience of putWorkExperiencesResponse.data.workExperiences) {
          resumeStoreActions.putWorkExperience(workExperience, { upsert: true });
        }
        resumeStoreActions.setIsPuttingWorkExperiences(false);
  
        // return explicitly
        return;
      } catch (err) {
        // store error and indicate we are no longer loading
        resumeStoreActions.setPuthWorkExperiencesError(err);
        resumeStoreActions.setIsPuttingWorkExperiences(false);

        // return explicitly
        return;
      }
    },
    deleteWorkExperiences: async (deleteWorkExperiencesRequest: { jwt: string; workExperienceIds: string[]; }) => {
      try {
        // deconstruct for ease
        const {
          jwt,
          workExperienceIds
        } = deleteWorkExperiencesRequest;

        console.log('deleteWorkExperiencesRequest', deleteWorkExperiencesRequest);
        // indicate we are loading and reset any old errors
        resumeStoreActions.setIsPuttingWorkExperiences(true);
        resumeStoreActions.setPuthWorkExperiencesError(undefined);
  
        // attempt to search system
        const [
          deletetWorkExperiencesResponse
        ] = await promiseUtils.allSettled([
          resumeServices.deleteWorkExperiences({ jwt, workExperienceIds })
        ]);
        
        // if our call failed handle appropriately else move on
        if (deletetWorkExperiencesResponse.status === 'rejected') {
          throw deletetWorkExperiencesResponse.reason;
        }
  
        // store data and indicate we are no longer loading
        for (const workExperienceId of deletetWorkExperiencesResponse.data.workExperienceIds) {
          resumeStoreActions.deleteWorkExperience(workExperienceId);
        }
        resumeStoreActions.setIsPuttingWorkExperiences(false);
  
        // return explicitly
        return;
      } catch (err) {
        // store error and indicate we are no longer loading
        resumeStoreActions.setPuthWorkExperiencesError(err);
        resumeStoreActions.setIsPuttingWorkExperiences(false);

        // return explicitly
        return;
      }
    }
  }
}
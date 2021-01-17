import type { Writable } from "svelte/store";
import type { ResumeStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';
import { Certification, SchoolExperience, SchoolExperienceInterface, WorkExperience } from "../../models/resume";
import { mdiGestureSwipeLeft } from "@mdi/js";

export interface ResumeStoreActionsInterface {
  setSchoolExperiences: (schoolExperiences: SchoolExperience[]) => void;
  putSchoolExperience: (schoolExperience: SchoolExperience, putSchoolExperienceOptions: { upsert?: boolean }) => void;
  deleteSchoolExperience: (schoolExperience: SchoolExperience) => void;
  setWorkExperiences: (workExperiences: WorkExperience[]) => void;
  putWorkExperience: (workExperience: WorkExperience, putWorkExperienceOptions: { upsert?: boolean }) => void;
  deleteWorkExperience: (workExperienceId: string) => void;
  setIsDeletingWorkExperiences: (isDeletingWorkExperiences: boolean) => void;
  setDeleteWorkExperiencesError: (deletehWorkExperiencesError: any) => void;
  setIsSearchingWorkExperiences: (isSearchingWorkExperiences: boolean) => void;
  setSearchWorkExperiencesError: (searchWorkExperiencesError: any) => void;
  setIsPuttingWorkExperiences: (isPuttingWorkExperiences: boolean) => void;
  setPuthWorkExperiencesError: (putWorkExperiencesError: any) => void;
  setCertifications: (certifications: Certification[]) => void;
}

export const createResumeStoreActions = (resumeStore: Writable<ResumeStoreStateInterface & object>): ResumeStoreActionsInterface => {

  return {
    setSchoolExperiences: (schoolExperiences: SchoolExperience[]) => {
      resumeStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { schoolExperiences }
        )
      });
    },
    putSchoolExperience: (schoolExperience: SchoolExperienceInterface, putSchoolExperienceOptions: { upsert?: boolean }) => {
      resumeStore.update(state => {
        // create a copy of the current state property
        const schoolExperiences = state.schoolExperiences.slice();

        // see if item exists by id
        const schoolExperienceIndex = _.findIndex(state.schoolExperiences, { schoolExperienceId: schoolExperience.schoolExperienceId })
  
        // if it does exit then replace it and
        // if it does not exist then create a new entry
        if (schoolExperienceIndex > -1) {
          schoolExperiences[schoolExperienceIndex] = new SchoolExperience(schoolExperience);
        } else if (putSchoolExperienceOptions.upsert) {
          schoolExperiences.push(new SchoolExperience(schoolExperience));
        }
        // return the new state
        return _.assign(
          {},
          state,
          { schoolExperiences }
        )
      });
    },
    deleteSchoolExperience: (schoolExperience: SchoolExperience) => {
      resumeStore.update(state => {
        // create a copy of the current state property
        const schoolExperiences = state.schoolExperiences.slice();

        // see if item exists by id
        const schoolExperienceIndex = _.findIndex(schoolExperiences, { schoolExperienceId: schoolExperience.schoolExperienceId })
  
        // remove the instance if found
        if (schoolExperienceIndex > -1) {
          schoolExperiences.splice(schoolExperienceIndex, 1)
        }

        // return the new state
        return _.assign(
          {},
          state,
          { schoolExperiences }
        )
      });
    },
    setWorkExperiences: (workExperiences: WorkExperience[]) => {
      resumeStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { workExperiences }
        )
      });
    },
    putWorkExperience: (workExperience: WorkExperience, putWorkExperienceOptions: { upsert?: boolean }) => {
      resumeStore.update(state => {
        // create a copy of the current state property
        const workExperiences = state.workExperiences.slice();

        // see if item exists by id
        const workExperienceIndex = _.findIndex(state.workExperiences, { workExperienceId: workExperience.workExperienceId })
  
        // if it does exit then replace it and
        // if it does not exist then create a new entry
        if (workExperienceIndex > -1) {
          workExperiences[workExperienceIndex] = new WorkExperience(workExperience);
        } else if (putWorkExperienceOptions.upsert) {
          workExperiences.push(new WorkExperience(workExperience));
        }
        // return the new state
        return _.assign(
          {},
          state,
          { workExperiences }
        )
      });
    },
    deleteWorkExperience: (workExperienceId: string) => {
      resumeStore.update(state => {
        // create a copy of the current state property
        const workExperiences = state.workExperiences.slice();

        // see if item exists by id
        const workExperienceIndex = _.findIndex(state.workExperiences, { workExperienceId })
  
        // remove the instance if found
        if (workExperienceIndex > -1) {
          workExperiences.splice(workExperienceIndex, 1)
        }

        // return the new state
        return _.assign(
          {},
          state,
          { workExperiences }
        )
      });
    },
    setIsDeletingWorkExperiences: (isDeletingWorkExperiences: boolean) => {
      resumeStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isDeletingWorkExperiences }
        )
      });
    },
    setDeleteWorkExperiencesError: (deleteWorkExperiencesError: any) => {
      resumeStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { deleteWorkExperiencesError }
        )
      });
    },
    setIsSearchingWorkExperiences: (isSearchingWorkExperiences: boolean) => {
      resumeStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isSearchingWorkExperiences }
        )
      });
    },
    setSearchWorkExperiencesError: (searchWorkExperiencesError: any) => {
      resumeStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { searchWorkExperiencesError }
        )
      });
    },
    setIsPuttingWorkExperiences: (isPuttingWorkExperiences: boolean) => {
      resumeStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isPuttingWorkExperiences }
        )
      });
    },
    setPuthWorkExperiencesError: (putWorkExperiencesError: any) => {
      resumeStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { putWorkExperiencesError }
        )
      });
    },
    setCertifications: (certifications: Certification[]) => {
      resumeStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { certifications }
        )
      });
    }
  }
}

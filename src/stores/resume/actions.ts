import type { Writable } from "svelte/store";
import type { ResumeStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';
import { Certification, SchoolExperience, SchoolExperienceInterface, WorkExperience } from "../../models/resume";

export interface ResumeStoreActionsInterface {
  setSchoolExperiences: (schoolExperiences: SchoolExperience[]) => void;
  putSchoolExperience: (schoolExperience: SchoolExperience, putSchoolExperienceOptions: { upsert?: boolean }) => void;
  deleteSchoolExperience: (schoolExperience: SchoolExperience) => void;
  setWorkExperiences: (workExperiences: WorkExperience[]) => void;
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
// libraries
import { promiseUtils, _ } from '../../lib/utils';
import type { AnyObject } from '../../models/common';
import type { SchoolExperienceInterface, WorkExperienceInterface, CertificationInterface } from '../../models/resume';
import { saveAs } from 'file-saver';

// store specific
import type { ResumeStoreActionsInterface } from "./actions";

// services
import * as resumeServices from '../../services/resume';
import { async } from 'rxjs';

export interface ResumeStoreThunksInterface {
  downloadResume: () => Promise<void>;

  searchWorkExperiences: (searchWorkExperiencesRequest: { searchCriteria: AnyObject; searchOptions: { pageNumber: number; pageSize: number; } }) => Promise<void>;
  putWorkExperiences: (putWorkExperiencesRequest: { jwt: string; workExperiences: WorkExperienceInterface[]; }) => Promise<void>;
  deleteWorkExperiences: (deleteWorkExperiencesRequest: { jwt: string; workExperienceIds: string[]; }) => Promise<void>;

  searchSchoolExperiences: (searchSchoolExperiencesRequest: { searchCriteria: AnyObject; searchOptions: { pageNumber: number; pageSize: number; } }) => Promise<void>;
  putSchoolExperiences: (putSchoolExperiencesRequest: { jwt: string; schoolExperiences: SchoolExperienceInterface[]; }) => Promise<void>;
  deleteSchoolExperiences: (deleteSchoolExperiencesRequest: { jwt: string; schoolExperienceIds: string[]; }) => Promise<void>;

  searchCertifications: (searchCertificationsRequest: { searchCriteria: AnyObject; searchOptions: { pageNumber: number; pageSize: number; } }) => Promise<void>;
  putCertifications: (putCertificationsRequest: { jwt: string; certifications: CertificationInterface[]; }) => Promise<void>;
  deleteCertifications: (deleteCertificationsRequest: { jwt: string; certificationIds: string[]; }) => Promise<void>;
}

export const createResumeStoreThunks = (resumeStoreActions: ResumeStoreActionsInterface): ResumeStoreThunksInterface => {

  return {
    downloadResume: async() => {
      try {
        resumeStoreActions.setIsDownloadingResume(true);
        resumeStoreActions.setDownloadResumeError(undefined);
  
        // attempt to search system
        const [
          downloadResumeResponse
        ] = await promiseUtils.allSettled([
          resumeServices.downloadResume()
        ]);
        
        // if our call failed handle appropriately else move on
        if (downloadResumeResponse.status === 'rejected') {
          throw downloadResumeResponse.reason;
        }

        // convert file and save
        const base64Conversion = await fetch(`data:application/pdf;base64,${downloadResumeResponse.data.bytes}`);
        const base64ConversionBlob =  await base64Conversion.blob();
        saveAs(base64ConversionBlob, 'blaine-richardson-resume.pdf');

        resumeStoreActions.setIsDownloadingResume(false);

        // return explicitly
        return;
      } catch (err) {
        console.log(`downloadResumeError=`, err);

        // store error and indicate we are no longer loading
        resumeStoreActions.setDownloadResumeError(err);
        resumeStoreActions.setIsDownloadingResume(true);

        // return explicitly
        return;
      }
    },

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
        resumeStoreActions.setPutWorkExperiencesError(undefined);
  
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
        resumeStoreActions.setPutWorkExperiencesError(err);
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
        resumeStoreActions.setPutWorkExperiencesError(undefined);
  
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
        resumeStoreActions.setPutWorkExperiencesError(err);
        resumeStoreActions.setIsPuttingWorkExperiences(false);

        // return explicitly
        return;
      }
    },

    searchSchoolExperiences: async (_searchSchoolExperiencesRequest: { searchCriteria: AnyObject; searchOptions: { pageNumber: number; pageSize: number; } }) => {
      try {
        // indicate we are loading and reset any old errors
        resumeStoreActions.setIsSearchingSchoolExperiences(true);
        resumeStoreActions.setSearchSchoolExperiencesError(undefined);
  
        // attempt to search system
        const [
          searchSchoolExperiencesResponse
        ] = await promiseUtils.allSettled([
          resumeServices.searchSchoolExperiences()
        ]);
        
        // if our call failed handle appropriately else move on
        if (searchSchoolExperiencesResponse.status === 'rejected') {
          throw searchSchoolExperiencesResponse.reason;
        }
  
        // store data and indicate we are no longer loading
        resumeStoreActions.setSchoolExperiences(searchSchoolExperiencesResponse.data.schoolExperiences);
        resumeStoreActions.setIsSearchingSchoolExperiences(false);
  
        // return explicitly
        return;
      } catch (err) {
        // store error and indicate we are no longer loading
        resumeStoreActions.setSearchSchoolExperiencesError(err);
        resumeStoreActions.setIsSearchingSchoolExperiences(false);

        // return explicitly
        return;
      }
    },
    putSchoolExperiences: async (putSchoolExperiencesRequest: { jwt: string; schoolExperiences: SchoolExperienceInterface[]; }) => {
      try {
        // deconstruct for ease
        const {
          jwt,
          schoolExperiences
        } = putSchoolExperiencesRequest;

        console.log('putSchoolExperiencesRequest', putSchoolExperiencesRequest);
        // indicate we are loading and reset any old errors
        resumeStoreActions.setIsPuttingSchoolExperiences(true);
        resumeStoreActions.setPutSchoolExperiencesError(undefined);
  
        // attempt to search system
        const [
          putSchoolExperiencesResponse
        ] = await promiseUtils.allSettled([
          resumeServices.putSchoolExperiences({ jwt, schoolExperiences })
        ]);
        
        // if our call failed handle appropriately else move on
        if (putSchoolExperiencesResponse.status === 'rejected') {
          throw putSchoolExperiencesResponse.reason;
        }
  
        // store data and indicate we are no longer loading
        for (const schoolExperience of putSchoolExperiencesResponse.data.schoolExperiences) {
          resumeStoreActions.putSchoolExperience(schoolExperience, { upsert: true });
        }
        resumeStoreActions.setIsPuttingSchoolExperiences(false);
  
        // return explicitly
        return;
      } catch (err) {
        // store error and indicate we are no longer loading
        resumeStoreActions.setPutSchoolExperiencesError(err);
        resumeStoreActions.setIsPuttingSchoolExperiences(false);

        // return explicitly
        return;
      }
    },
    deleteSchoolExperiences: async (deleteSchoolExperiencesRequest: { jwt: string; schoolExperienceIds: string[]; }) => {
      try {
        // deconstruct for ease
        const {
          jwt,
          schoolExperienceIds
        } = deleteSchoolExperiencesRequest;

        console.log('deleteSchoolExperiencesRequest', deleteSchoolExperiencesRequest);
        // indicate we are loading and reset any old errors
        resumeStoreActions.setIsPuttingSchoolExperiences(true);
        resumeStoreActions.setPutSchoolExperiencesError(undefined);
  
        // attempt to search system
        const [
          deletetSchoolExperiencesResponse
        ] = await promiseUtils.allSettled([
          resumeServices.deleteSchoolExperiences({ jwt, schoolExperienceIds })
        ]);
        
        // if our call failed handle appropriately else move on
        if (deletetSchoolExperiencesResponse.status === 'rejected') {
          throw deletetSchoolExperiencesResponse.reason;
        }
  
        // store data and indicate we are no longer loading
        for (const schoolExperienceId of deletetSchoolExperiencesResponse.data.schoolExperienceIds) {
          resumeStoreActions.deleteSchoolExperience(schoolExperienceId);
        }
        resumeStoreActions.setIsPuttingSchoolExperiences(false);
  
        // return explicitly
        return;
      } catch (err) {
        // store error and indicate we are no longer loading
        console.log('deleteSchoolExperiencesErr', err);
        resumeStoreActions.setPutSchoolExperiencesError(err);
        resumeStoreActions.setIsPuttingSchoolExperiences(false);

        // return explicitly
        return;
      }
    },

    searchCertifications: async (_searchCertificationsRequest: { searchCriteria: AnyObject; searchOptions: { pageNumber: number; pageSize: number; } }) => {
      try {
        // indicate we are loading and reset any old errors
        resumeStoreActions.setIsSearchingCertifications(true);
        resumeStoreActions.setSearchCertificationsError(undefined);
  
        // attempt to search system
        const [
          searchCertificationsResponse
        ] = await promiseUtils.allSettled([
          resumeServices.searchCertifications()
        ]);
        
        // if our call failed handle appropriately else move on
        if (searchCertificationsResponse.status === 'rejected') {
          throw searchCertificationsResponse.reason;
        }
  
        // store data and indicate we are no longer loading
        resumeStoreActions.setCertifications(searchCertificationsResponse.data.certifications);
        resumeStoreActions.setIsSearchingCertifications(false);
  
        // return explicitly
        return;
      } catch (err) {
        // store error and indicate we are no longer loading
        resumeStoreActions.setSearchCertificationsError(err);
        resumeStoreActions.setIsSearchingCertifications(false);

        // return explicitly
        return;
      }
    },
    putCertifications: async (putCertificationsRequest: { jwt: string; certifications: CertificationInterface[]; }) => {
      try {
        // deconstruct for ease
        const {
          jwt,
          certifications
        } = putCertificationsRequest;

        console.log('putCertificationsRequest', putCertificationsRequest);
        // indicate we are loading and reset any old errors
        resumeStoreActions.setIsPuttingCertifications(true);
        resumeStoreActions.setPutCertificationsError(undefined);
  
        // attempt to search system
        const [
          putCertificationsResponse
        ] = await promiseUtils.allSettled([
          resumeServices.putCertifications({ jwt, certifications })
        ]);
        
        // if our call failed handle appropriately else move on
        if (putCertificationsResponse.status === 'rejected') {
          throw putCertificationsResponse.reason;
        }
  
        // store data and indicate we are no longer loading
        for (const certification of putCertificationsResponse.data.certifications) {
          resumeStoreActions.putCertification(certification, { upsert: true });
        }
        resumeStoreActions.setIsPuttingCertifications(false);
  
        // return explicitly
        return;
      } catch (err) {
        // store error and indicate we are no longer loading
        resumeStoreActions.setPutCertificationsError(err);
        resumeStoreActions.setIsPuttingCertifications(false);

        // return explicitly
        return;
      }
    },
    deleteCertifications: async (deleteCertificationsRequest: { jwt: string; certificationIds: string[]; }) => {
      try {
        // deconstruct for ease
        const {
          jwt,
          certificationIds
        } = deleteCertificationsRequest;

        console.log('deleteCertificationsRequest', deleteCertificationsRequest);
        // indicate we are loading and reset any old errors
        resumeStoreActions.setIsPuttingCertifications(true);
        resumeStoreActions.setPutCertificationsError(undefined);
  
        // attempt to search system
        const [
          deletetCertificationsResponse
        ] = await promiseUtils.allSettled([
          resumeServices.deleteCertifications({ jwt, certificationIds })
        ]);
        
        // if our call failed handle appropriately else move on
        if (deletetCertificationsResponse.status === 'rejected') {
          throw deletetCertificationsResponse.reason;
        }
  
        // store data and indicate we are no longer loading
        for (const certificationId of deletetCertificationsResponse.data.certificationIds) {
          resumeStoreActions.deleteCertification(certificationId);
        }
        resumeStoreActions.setIsPuttingCertifications(false);
  
        // return explicitly
        return;
      } catch (err) {
        // store error and indicate we are no longer loading
        console.log('deleteCertificationsErr', err);
        resumeStoreActions.setPutCertificationsError(err);
        resumeStoreActions.setIsPuttingCertifications(false);

        // return explicitly
        return;
      }
    }
  }
}
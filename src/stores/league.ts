import { create } from "zustand";

import { DELETE, GET, POST, PATCH } from "@/api/axiosConfig";
import { url } from "@/utils/url";
import { toast } from 'sonner'

interface AuthParams {
  values: Record<string, any>; // Generic object for dynamic form values
  enqueueSnackbar: (message: string, options?: { variant: "success" | "error" }) => void;
  token?: string; // Optional, used only for verification
  id?: string | number; // Optional, used only for verification
  query?: any;
}

interface SidebarStore {
  isLoading: boolean;
  leagues?: any;
  league?: any;
  jobsInfo?: any;
  statistics?: any;
  fetchLeagues?: any;
  fetchLeague?: any;
  updateLeague?: any;
  postLeague?: any;
  joinLeague?: any;
  removeLeague?: any;
  resetLeague?: any;
  applyToLeague?: any;
}

const useLeagueStore = create<SidebarStore>((set) => {
  return {
    leagues: [],
    league: undefined,
    isLoading: false,
    jobsInfo: undefined,
    statistics: undefined,

    fetchLeagues: async ({ query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: url?.league,
        query,
      });
      if (response) {
        console.log({response})
        set({ leagues: response?.data || [], jobsInfo: response, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    fetchLeague: async ({ id, query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: `${url?.league}/${id}/`,
        query,
      });
      if (response) {
        set({ league: response?.data, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    updateLeague: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await PATCH({
        url: url?.league + `/${id}`,
        values: values,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.leagues?.filter((data: any) => data?.id !== id);

          return {
            leagues: [{ ...response?.data, name: values?.name }, ...filteredData],
            individualLeague: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    postLeague: async ({ values }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.league,
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualLeague: {},
            leagues: [response?.data, ...state.leagues],
            isLoading: false,
          };
        });
      }
      if (!response) {
        set({ isLoading: false });
      }
      return response;
    },

    joinLeague: async ({ values }: AuthParams) => {

       try {
   set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.league+'/join',
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualLeague: {},
            leagues: [response?.data, ...state.leagues],
            isLoading: false,
          };
        });
      }
      if (!response) {
        set({ isLoading: false });
      }
      return response;
        } catch (error: any) {
         toast.error(error.response?.data?.msg || 'Something went wrong')
        }
     
    },

    removeLeague: async ({ values, query }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await DELETE({
        // values: values,
        url: url?.league + "/",
        query,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.leagues?.filter((data: any) => !values?.includes(data?.id));

          return {
            ...state,
            leagues: filteredData,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    applyToLeague: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await POST({
        url: url?.league + `${id}/apply`,
        values: values,
      });
      if (response) {
        set(() => {
          // const filteredData = state?.leagues?.filter((data: any) => data?.id !== id);

          return {
            // leagues: [{ ...response?.data, name: values?.name }, ...filteredData],
            // individualLeague: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    resetLeague: () => {
      set({
        leagues: [],
        league: undefined,
        isLoading: false,
      });
    },
  };
});

export default useLeagueStore;

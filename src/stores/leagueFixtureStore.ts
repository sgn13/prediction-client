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
  leagueFixtures?: any;
  leagueFixture?: any;
  jobsInfo?: any;
  statistics?: any;
  fetchLeagueFixtures?: any;
  fetchLeagueFixture?: any;
  updateLeagueFixture?: any;
  postLeagueFixture?: any;
  joinLeagueFixture?: any;
  removeLeagueFixture?: any;
  resetLeagueFixture?: any;
  applyToLeagueFixture?: any;
}

const useLeagueFixtureStore = create<SidebarStore>((set) => {
  return {
    leagueFixtures: [],
    leagueFixture: undefined,
    isLoading: false,
    jobsInfo: undefined,
    statistics: undefined,

    fetchLeagueFixtures: async ({ query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: url?.leagueFixture,
        query,
      });
      if (response) {
        console.log({response})
        set({ leagueFixtures: response?.data || [], jobsInfo: response, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    fetchLeagueFixture: async ({ id, query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: `${url?.leagueFixture}/${id}/`,
        query,
      });
      if (response) {
        set({ leagueFixture: response?.data, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    updateLeagueFixture: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await PATCH({
        url: url?.leagueFixture + `/${id}`,
        values: values,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.leagueFixtures?.filter((data: any) => data?.id !== id);

          return {
            leagueFixtures: [{ ...response?.data, name: values?.name }, ...filteredData],
            individualLeagueFixture: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    postLeagueFixture: async ({ values }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.leagueFixture,
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualLeagueFixture: {},
            leagueFixtures: [response?.data, ...state.leagueFixtures],
            isLoading: false,
          };
        });
      }
      if (!response) {
        set({ isLoading: false });
      }
      return response;
    },

    joinLeagueFixture: async ({ values }: AuthParams) => {

       try {
   set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.leagueFixture+'/join',
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualLeagueFixture: {},
            leagueFixtures: [response?.data, ...state.leagueFixtures],
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

    removeLeagueFixture: async ({ values, query }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await DELETE({
        // values: values,
        url: url?.leagueFixture + "/",
        query,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.leagueFixtures?.filter((data: any) => !values?.includes(data?.id));

          return {
            ...state,
            leagueFixtures: filteredData,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    applyToLeagueFixture: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await POST({
        url: url?.leagueFixture + `${id}/apply`,
        values: values,
      });
      if (response) {
        set(() => {
          // const filteredData = state?.leagueFixtures?.filter((data: any) => data?.id !== id);

          return {
            // leagueFixtures: [{ ...response?.data, name: values?.name }, ...filteredData],
            // individualLeagueFixture: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    resetLeagueFixture: () => {
      set({
        leagueFixtures: [],
        leagueFixture: undefined,
        isLoading: false,
      });
    },
  };
});

export default useLeagueFixtureStore;

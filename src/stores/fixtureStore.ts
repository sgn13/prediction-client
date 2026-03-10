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
  fixtures?: any;
  fixture?: any;
  jobsInfo?: any;
  statistics?: any;
  fetchFixtures?: any;
  fetchFixture?: any;
  updateFixture?: any;
  postFixture?: any;
  joinFixture?: any;
  removeFixture?: any;
  resetFixture?: any;
  applyToFixture?: any;
}

const useFixtureStore = create<SidebarStore>((set) => {
  return {
    fixtures: [],
    fixture: undefined,
    isLoading: false,
    jobsInfo: undefined,
    statistics: undefined,

    fetchFixtures: async ({ query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: url?.fixture+'/gameweek',
        query,
      });
      if (response) {
        console.log({response})
        set({ fixtures: response?.data || [], jobsInfo: response, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    fetchFixture: async ({ id, query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: `${url?.fixture}/${id}/`,
        query,
      });
      if (response) {
        set({ fixture: response?.data, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    updateFixture: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await PATCH({
        url: url?.fixture + `/${id}`,
        values: values,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.fixtures?.filter((data: any) => data?.id !== id);

          return {
            fixtures: [{ ...response?.data, name: values?.name }, ...filteredData],
            individualFixture: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    postFixture: async ({ values }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.fixture,
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualFixture: {},
            fixtures: [response?.data, ...state.fixtures],
            isLoading: false,
          };
        });
      }
      if (!response) {
        set({ isLoading: false });
      }
      return response;
    },

    joinFixture: async ({ values }: AuthParams) => {

       try {
   set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.fixture+'/join',
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualFixture: {},
            fixtures: [response?.data, ...state.fixtures],
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

    removeFixture: async ({ values, query }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await DELETE({
        // values: values,
        url: url?.fixture + "/",
        query,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.fixtures?.filter((data: any) => !values?.includes(data?.id));

          return {
            ...state,
            fixtures: filteredData,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    applyToFixture: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await POST({
        url: url?.fixture + `${id}/apply`,
        values: values,
      });
      if (response) {
        set(() => {
          // const filteredData = state?.fixtures?.filter((data: any) => data?.id !== id);

          return {
            // fixtures: [{ ...response?.data, name: values?.name }, ...filteredData],
            // individualFixture: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    resetFixture: () => {
      set({
        fixtures: [],
        fixture: undefined,
        isLoading: false,
      });
    },
  };
});

export default useFixtureStore;

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
  gameweeks?: any;
  gameweek?: any;
  jobsInfo?: any;
  statistics?: any;
  fetchGameweeks?: any;
  fetchGameweek?: any;
  updateGameweek?: any;
  postGameweek?: any;
  joinGameweek?: any;
  removeGameweek?: any;
  resetGameweek?: any;
  applyToGameweek?: any;
}

const useGameweekStore = create<SidebarStore>((set) => {
  return {
    gameweeks: [],
    gameweek: undefined,
    isLoading: false,
    jobsInfo: undefined,
    statistics: undefined,

    fetchGameweeks: async ({ query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: url?.gameweek,
        query,
      });
      if (response) {
        console.log({response})
        set({ gameweeks: response?.data || [], jobsInfo: response, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    fetchGameweek: async ({ id, query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: `${url?.gameweek}/${id}/`,
        query,
      });
      if (response) {
        set({ gameweek: response?.data, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    updateGameweek: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await PATCH({
        url: url?.gameweek + `/${id}`,
        values: values,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.gameweeks?.filter((data: any) => data?.id !== id);

          return {
            gameweeks: [{ ...response?.data, name: values?.name }, ...filteredData],
            individualGameweek: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    postGameweek: async ({ values }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.gameweek,
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualGameweek: {},
            gameweeks: [response?.data, ...state.gameweeks],
            isLoading: false,
          };
        });
      }
      if (!response) {
        set({ isLoading: false });
      }
      return response;
    },

    joinGameweek: async ({ values }: AuthParams) => {

       try {
   set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.gameweek+'/join',
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualGameweek: {},
            gameweeks: [response?.data, ...state.gameweeks],
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

    removeGameweek: async ({ values, query }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await DELETE({
        // values: values,
        url: url?.gameweek + "/",
        query,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.gameweeks?.filter((data: any) => !values?.includes(data?.id));

          return {
            ...state,
            gameweeks: filteredData,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    applyToGameweek: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await POST({
        url: url?.gameweek + `${id}/apply`,
        values: values,
      });
      if (response) {
        set(() => {
          // const filteredData = state?.gameweeks?.filter((data: any) => data?.id !== id);

          return {
            // gameweeks: [{ ...response?.data, name: values?.name }, ...filteredData],
            // individualGameweek: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    resetGameweek: () => {
      set({
        gameweeks: [],
        gameweek: undefined,
        isLoading: false,
      });
    },
  };
});

export default useGameweekStore;

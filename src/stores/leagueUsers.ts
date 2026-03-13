import { create } from "zustand";

import { DELETE, GET, POST, PATCH } from "@/api/axiosConfig";
import { url } from "@/utils/url";

interface AuthParams {
  values: Record<string, any>; // Generic object for dynamic form values
  enqueueSnackbar: (message: string, options?: { variant: "success" | "error" }) => void;
  token?: string; // Optional, used only for verification
  id?: string | number; // Optional, used only for verification
  query?: any;
}

interface SidebarStore {
  isLoading: boolean;
  leagueUsers?: any;
  leagueUser?: any;
  jobsInfo?: any;
  statistics?: any;
  fetchLeagueUsers?: any;
  fetchLeagueUser?: any;
  updateLeagueUser?: any;
  postLeagueUser?: any;
  removeLeagueUser?: any;
  resetLeagueUser?: any;
  applyToLeagueUser?: any;
}

const useLeagueUserStore = create<SidebarStore>((set) => {
  return {
    leagueUsers: [],
    leagueUser: undefined,
    isLoading: false,
    jobsInfo: undefined,
    statistics: undefined,

    fetchLeagueUsers: async ({  id,query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: `${url?.leagueUser}/${id}/leaderboard`,
        query,
      });
      if (response) {
        set({ leagueUsers: response?.data || [], jobsInfo: response, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    fetchLeagueUser: async ({ id, query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: `${url?.leagueUser}/${id}/`,
        query,
      });
      if (response) {
        set({ leagueUser: response?.data, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    updateLeagueUser: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await PATCH({
        url: url?.leagueUser + `/${id}`,
        values: values,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.leagueUsers?.filter((data: any) => data?.id !== id);

          return {
            leagueUsers: [{ ...response?.data, name: values?.name }, ...filteredData],
            individualLeagueUser: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    postLeagueUser: async ({ values }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.leagueUser,
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualLeagueUser: {},
            leagueUsers: [response?.data, ...state.leagueUsers],
            isLoading: false,
          };
        });
      }
      if (!response) {
        set({ isLoading: false });
      }
      return response;
    },

    removeLeagueUser: async ({ values, query }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await DELETE({
        // values: values,
        url: url?.leagueUser + "/",
        query,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.leagueUsers?.filter((data: any) => !values?.includes(data?.id));

          return {
            ...state,
            leagueUsers: filteredData,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    applyToLeagueUser: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await POST({
        url: url?.leagueUser + `${id}/apply`,
        values: values,
      });
      if (response) {
        set(() => {
          // const filteredData = state?.leagueUsers?.filter((data: any) => data?.id !== id);

          return {
            // leagueUsers: [{ ...response?.data, name: values?.name }, ...filteredData],
            // individualLeagueUser: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    resetLeagueUser: () => {
      set({
        leagueUsers: [],
        leagueUser: undefined,
        isLoading: false,
      });
    },
  };
});

export default useLeagueUserStore;

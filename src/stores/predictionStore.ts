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
  predictions?: any;
  prediction?: any;
  jobsInfo?: any;
  statistics?: any;
  fetchPredictions?: any;
  fetchPrediction?: any;
  updatePrediction?: any;
  postPrediction?: any;
  joinPrediction?: any;
  removePrediction?: any;
  resetPrediction?: any;
  applyToPrediction?: any;
}

const usePredictionStore = create<SidebarStore>((set) => {
  return {
    predictions: [],
    prediction: undefined,
    isLoading: false,
    statistics: undefined,

    fetchPredictions: async ({ query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: url?.prediction,
        query,
      });
      if (response) {
        set({ predictions: response?.data || [], jobsInfo: response, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    fetchPrediction: async ({ id, query }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await GET({
        url: `${url?.prediction}/${id}/`,
        query,
      });
      if (response) {
        set({ prediction: response?.data, isLoading: false });
      }
      !response && set({ isLoading: false });
      return response;
    },

    updatePrediction: async ({ values, id }: AuthParams) => {
      set({ isLoading: true });
      const response: any = await PATCH({
        url: url?.prediction + `/${id}`,
        values: values,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.predictions?.filter((data: any) => data?.id !== id);

          return {
            predictions: [{ ...response?.data, name: values?.name }, ...filteredData],
            individualPrediction: response?.data,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

    postPrediction: async ({ values }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.prediction,
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualPrediction: {},
            predictions: [response?.data, ...state.predictions],
            isLoading: false,
          };
        });
      }
      if (!response) {
        set({ isLoading: false });
      }
      return response;
    },

    joinPrediction: async ({ values }: AuthParams) => {

       try {
   set({ isLoading: true });

      const response: any = await POST({
        values: values,
        url: url?.prediction+'/join',
      });
      if (response) {
        set((state) => {
          // let datass = (data?.data || [])?.map((it) => ({ ...it, name: values?.[0]?.name }));
          return {
            individualPrediction: {},
            predictions: [response?.data, ...state.predictions],
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

    removePrediction: async ({ values, query }: AuthParams) => {
      set({ isLoading: true });

      const response: any = await DELETE({
        // values: values,
        url: url?.prediction + "/",
        query,
      });
      if (response) {
        set((state) => {
          const filteredData = state?.predictions?.filter((data: any) => !values?.includes(data?.id));

          return {
            ...state,
            predictions: filteredData,
            isLoading: false,
          };
        });
      }
      !response && set({ isLoading: false });
      return response;
    },

   

    resetPrediction: () => {
      set({
        predictions: [],
        prediction: undefined,
        isLoading: false,
      });
    },
  };
});

export default usePredictionStore;

import axios from "./apiService";

export const uploadFileFarm = (formData: FormData) => axios.post("File/farm", formData)

export const uploadFileFWorker = (formData: FormData) => axios.post("File/worker", formData,{
    headers: { "Content-Type": "multipart/form-data" }, 
  })
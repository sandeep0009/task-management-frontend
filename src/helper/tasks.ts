import { axiosInstance } from "./axiosInstance"



export type Task={
    id:string,
    title:string,
    description:string,
    status:string
}
export const getTasks=async()=>{
    const data=await axiosInstance.get('/all');
    return data.data;
}


export const updateTasks=async(id:string, updates: Partial<{ title: string; description: string; status: string }>)=>{
    const data=await axiosInstance.put(`/${id}`,{updates});
    return data.data;
}

export const createTask=async(title:string,description:string,status:string)=>{
    const data=await axiosInstance.post('/create',{title,description,status});
    return data.data;
}

export const deleteTask=async(id:string)=>{
    const data=await axiosInstance.delete(`/delete/${id}`);
    return data.data;
}
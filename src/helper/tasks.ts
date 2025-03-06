import { axiosInstance } from "./axiosInstance"



export type Task={
    id:string,
    title:string,
    status:string
}

export const getTasks=async()=>{
    const data=await axiosInstance.get('/all');
    return data.data;
}


export const updateTasks=async(id:string, updates: Partial<{ title: string; status: string }>)=>{
    console.log(updates);
    const data=await axiosInstance.put(`/${id}`,updates);
    console.log(data);
    return data.data;
}

export const createTask=async(title:string,status:string)=>{
    if (!status) status = "todo";
    const data=await axiosInstance.post('/create',{title,status});
    return data.data;
}

export const deleteTask=async(id:string)=>{
    const data=await axiosInstance.delete(`/delete/${id}`);
    return data.data;
}
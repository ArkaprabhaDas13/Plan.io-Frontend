
interface CreatePayload{
    description: string;
    taskId: string;
    createdBy?: string;
}

export const getComments = async(taskId: string)=>{
    try{
        const url = `http://localhost:3000/api/task/${taskId}/comments`;
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok) {  // ✅ Check response status
            throw new Error("Error in fetching Comments");
        }
        return response.json();
    }catch(err){
        if(err instanceof Error)
        {
            throw new Error(err.message);
        }
        else
        {
            console.error("Ran into an unexpected error");
        }
    }
}

export const createComment = async(payload: CreatePayload)=>{
    try{
        const token = localStorage.getItem('token');
        const url = `http://localhost:3000/api/task/${payload.taskId}/comments`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })

        if(!response.ok)
        {
            throw new Error("Error in creating a new comment");
        }

        return response.json();
    }catch(err){
        if(err instanceof Error)
        {
            throw new Error(err.message);
        }
        else{
            console.error('Unexpected error');
        }
    }
}
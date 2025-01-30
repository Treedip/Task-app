
const BASE_URL = 'https://taskbackend-unnp.onrender.com/api';

async function handleGetAllTask(){
    let response =  await axios.get(`${BASE_URL}/tasks`);
    return response.data.data;
}

async function editTask(taskId, data){
    let response = await axios.patch(`${BASE_URL}/tasks/${taskId}`, data);
    return response;
}

async function deleteTask(taskId){
    await axios.delete(`${BASE_URL}/tasks/${taskId}`);
}

async function addTask(payload){
    const task = await axios.post(`${BASE_URL}/tasks`, payload);
    return task.data.data;
}
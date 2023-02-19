import {useState, useEffect} from 'react'
import AddTaskForm from './components/AddTaskForm.jsx'
import UpdateForm from './components/UpdateForm.jsx'
import ToDo from './components/ToDo.jsx'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Swal from "sweetalert2";


//Para chequear si toDo (Linea 21) tiene algo cuando el se le pasa el const de Todo
// 


function App() {

  const [taskList, setTasklist] = useState([]);
  useEffect(() => {
    axios.get("https://finalonboardingback-production.up.railway.app/api/tasks").then((res) => {
      setTasklist(res.data);
    });
  }, [])
 
  // Tasks (ToDo List) State
  //////////////////////////
  const [toDo, setToDo] = useState([
    {id: 1, title: 'Task 1', status: false},
    {id: 2, title: 'Task 2', status: false}
  ])

  // Temp State
  /////////////
  const [newTask, setNewTask] = useState('')
  const [updateData, setUpdateData] = useState('')
  console.log(taskList)
  // Add task 
  //////////
  
  
  const addTask = () => {
    if(newTask) {
      let num = taskList.length + 1 
      
      axios.post("https://finalonboardingback-production.up.railway.app/api/tasks",{
        title:newTask,
        status:false
      })
      .then((res) => {
        setTasklist([
          ...taskList, 
          res.data
        ])
        setNewTask('')
      });

    }
  }

  // Delete task 
  //////////////
  const deleteTask = (id) => {
   setTasklist(taskList.filter(task => task.id !== id))
   
   axios.delete(`https://finalonboardingback-production.up.railway.app/api/tasks/${id}`)
   .then(() =>{
    setTasklist(taskList.filter(task => task.id !== id))
   })

   showAlert();
    
  }

  //Delete Task Alert 
const showAlert= () =>{
 Swal.fire({
            title: "Hecho",
            text: "Tarea Eliminada",
            icon: "success",
            confirmButtonText: "OK",
          });
}


  // Mark task as done or completed
  /////////////////////////////////
  const markDone = (task) => {
   
    axios.put(`https://finalonboardingback-production.up.railway.app/api/tasks/${task.id}`,{
      title: task.title,
      status: !task.status
    })
    .then((res) => {
      setTasklist(taskList.map(
      item => item.id === task.id 
      ? ({ ...item, status: !item.status }) 
      : (item),
      res.data
      ))
      
    });

  }

  // Cancel update
  ////////////////
  const cancelUpdate = () => {
    setUpdateData('')
  }

  // Change task for update
  /////////////////////////
  const changeHolder = (e) => {
    setUpdateData({...updateData, title: e.target.value})

  }

  // Update task
  //////////////
  const updateTask = () => {
    
    axios.put(`https://finalonboardingback-production.up.railway.app/api/tasks/${updateData.id}`, {
      title:updateData.title,
      status: updateData.status
    })
    .then((res) => {
      let removeOldRecord = [...taskList].filter(task => task.id !== updateData.id)
      setTasklist([
        ...removeOldRecord, 
        res.data
      ]) 
      setUpdateData('')
      
      });
  }

  return (
    <div className="container App">

    <br /><br />
    <h2>To Do List</h2>
    <br /><br />

    {updateData && updateData ? (
      <UpdateForm 
        updateData={updateData}
        changeHolder={changeHolder}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

      {taskList && taskList.length ? '' : 'No Tasks...'}
  
    <ToDo
      //toDo={toDo}
      toDo={taskList}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />  

    </div>
  );
}

export default App;



import {useState, useEffect} from 'react'
import AddTaskForm from './components/AddTaskForm.jsx'
import UpdateForm from './components/UpdateForm.jsx'
import ToDo from './components/ToDo.jsx'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


//Para chequear si toDo (Linea 21) tiene algo cuando el se le pasa el const de Todo
// {toDo && toDo.length ? '' : 'No Tasks...'}


function App() {

  const [taskList, setTasklist] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/tasks").then((res) => {
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

  // Add task 
  //////////
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1 
      
      setTasklist([
        ...taskList, 
        { id: num, title: newTask, status: false }
      ])

      setNewTask('')

    }
  }

  // Delete task 
  //////////////
  const deleteTask = (id) => {
    
   setTasklist(taskList.filter(task => task.id !== id))

  }

  // Mark task as done or completed
  /////////////////////////////////
  const markDone = (id) => {
    
    
    setTasklist(taskList.map(
      task => task.id === id 
      ? ({ ...task, status: !task.status }) 
      : (task) 
    ))

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
    
    let removeOldRecord = [...taskList].filter(task => task.id !== updateData.id)
    setTasklist([
      ...removeOldRecord, 
      updateData
    ])
    
    setUpdateData('')

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



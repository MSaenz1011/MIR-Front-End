import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

const ToDo = ({ toDo, markDone, setUpdateData, deleteTask }) => {
  console.log(toDo)
  return(
    <>
      
      
      {toDo && toDo
      
      .map( (task, index) => {
        return(
          <React.Fragment key={task.id}>
            <div className="col taskBg">
              <div className={ task.status ? 'done' : '' }>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.title}</span>
              </div>
              <div className="iconsWrap">
                <span title="Completed / Not Completed"
                  onClick={ (e) => markDone(task) }
                >
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>

                {task.status ? null : (
                  <span title="Edit"
                    onClick={ () => setUpdateData(task) }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                )}

                <span title="Delete"
                  onClick={() => deleteTask(task.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>
            </div>
          </React.Fragment>
        )
      })
      }  
    </>
  )
}

export default ToDo;

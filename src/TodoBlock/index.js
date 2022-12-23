import "./index.css"
import { v4 as uuidv4 } from 'uuid';


import  { Component } from 'react'

export default class TodoBlock extends Component {
    state={todoList:[],inputValue:""}

    inputChange=(event)=>{
        this.setState({inputValue:event.target.value})
    }

    clear=()=>{
        this.setState({inputValue:""})
    }

    reset=()=>{
        this.setState({todoList:[],inputValue:""})
    }

    addItem=()=>{
        const {inputValue}=this.state

        if(inputValue!==""){
            const a={
                id:uuidv4(),
                todo:inputValue,
                isCompleted:false,
            }
            this.setState(prev=>({todoList:[a,...prev.todoList],inputValue:""}))
        }
    }

    doneClick=(id)=>{
        const {todoList}=this.state

        const done=todoList.map(each=>{
            if(each.id===id){
               return {...each,isCompleted:true}
            }
            return each
        })
        this.setState({todoList:done})
    }

    delete=(id)=>{
        const {todoList}=this.state

        const del=todoList.filter(each=>(
            each.id!==id
        ))
        this.setState({todoList:del})
    }


  render() {

    const {inputValue,todoList}=this.state
    console.log(todoList)
    const task=todoList.filter(each=>(
        each.isCompleted===false
    ))

    const taskComp=todoList.filter(each=>(
        each.isCompleted===true
    ))

    return (
      <div className='container'>
         <h1 className="task-heading">Add Task</h1>
     <input value={inputValue} onChange={this.inputChange} type="text" />
     <div className="btn-div">
        <button onClick={this.addItem} className="btn" type="button">Add</button>
        <button onClick={this.clear} className="btn" type="button">Clear</button>
        <button onClick={this.reset} className="btn" type="button">Reset</button>
     </div>

     <div className="tasks-div">
        <h1 className="task-heading">Tasks</h1>
        {task.length===0?<h1 className="task-n">No Tasks</h1>: <ul>
            {task.map(each=>(
                 <li key={each.id} className="task-item-div">
                 <h1 className="task-h">{each.todo}</h1>
                 <div className="task-btn-div">
                     <button onClick={()=>this.doneClick(each.id)} className="task-btn done" type="button">Done</button>
                     <button onClick={()=>this.delete(each.id)} className="task-btn del" type="button">Delete</button>
                 </div>
             </li>
            ))}
        </ul>}
       
       
     </div>

     <div className="tasks-div">
        <h1 className="task-heading">Tasks Completed</h1>
        {taskComp.length===0?<h1 className="task-n">No Tasks Completed</h1>: <ul>
            {taskComp.map(each=>(
                 <li key={each.id} className="task-item-div t-c">
                 <h1 className="task-h">{each.todo}</h1>
                
             </li>
            ))}
        </ul>}
       
       
     </div>
        </div>
    )
  }
}

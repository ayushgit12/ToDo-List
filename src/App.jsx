import { useState , useEffect } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todos = []
    if(JSON.parse(localStorage.getItem("todos")))
      if(JSON.parse(localStorage.getItem("todos")).length!==0)
        todos =  JSON.parse(localStorage.getItem("todos"))
        setTodos(todos)
      }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = ()=>{
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e,id) => {

    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos)
    saveToLS()


  }

  const handleDelete = (e,id) => {

    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos)
    saveToLS()
    
  }

  const handleAdd = () => {

    

    setTodos([...todos, {id:uuidv4() ,  todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    
  }

  const handleCheckbox = (e) => {
    
      let id = e.target.name;
      let index = todos.findIndex(item=>{
        return item.id===id
      })

      let newTodos = [...todos]
      newTodos[index].isCompleted = !newTodos[index].isCompleted
      setTodos(newTodos)
      saveToLS()

  }
  




  return (
    <>
      <Navbar />
      <div className="container mx-auto text-black bg-indigo-100 rounded-xl my-5 p-5 min-h-[70vh] md:w-1/2">
        <h1 className='text-center text-xl font-bold'>iTask - Your Task Managing Partner!</h1>
        <div className="addTodo my-5">
          <h2 className='font-bold text-lg'>Add a Todo</h2>
          <input type="text" value={todo} onChange={handleChange} className='w-1/2 p-1 rounded-md' />
          <button disabled={todo.length<3} className='bg-indigo-600 p-3 py-1 rounded-md text-white disabled:bg-indigo-900 hover:bg-indigo-900 mx-6 text-sm' onClick={handleAdd}>Save</button>
        </div>

        <input onChange={toggleFinished} type="checkbox" checked={showFinished} id="" /> Show Finished

        <h2 className='text-lg font-bold'>Your Todos</h2>

        <div className="todos">
          {todos.length===0 && <div>No Todos to Display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) &&  <div key={item.id} className="todo flex md:w-1/2 justify-between my-3">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>

              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-indigo-600 p-3 py-1 rounded-md text-white hover:bg-indigo-900 mx-1 text-sm'><FaEdit />
                </button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-indigo-600 p-3 py-1 rounded-md text-white hover:bg-indigo-900 text-sm mx-1'><MdDeleteForever /></button>
              </div>


            </div>

          })}
        </div>

      </div>
    </>
  )
}

export default App

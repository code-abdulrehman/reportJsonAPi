import React from 'react'
import Table from './Components/Table'
import Header from './Components/Header'
import PostForm from './Components/PostForm'

function App() {
  return (

    <div className="w-full h-screen bg-slate-900 flex flex-col gap-8">
      <Header />
      {/* <PostForm/> */}
      <div className='flex flex-col container mx-auto overflow-y-auto'>
        <Table />
      </div>
    </div>

  )
}

export default App
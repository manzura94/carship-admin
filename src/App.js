import React from 'react'
import MainLayout from './layouts/MainLayout'

const App = () => {

  const request = () =>  {
    const getData = () => {
      console.log('Hi')
    }
    return {name : 'Maria' , fun : getData}
  }

  const getData = () => {
    return  request
  }

  const useLoad = getData()
  const res = useLoad()

  return (
    <div>
        <MainLayout/>
    </div>
  )
}

export default App
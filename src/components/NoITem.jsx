import React from 'react'

const NoITem = () => {
  return (
      <div className='flex flex-col items-center'>
        <img src="./public/empty-list.png" className='w-20 m-2' alt="" />
        <div>
            <p>Todo list is empty</p>
        </div>
      </div>
  )
}

export default NoITem

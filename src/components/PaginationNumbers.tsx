import React from 'react'

const PaginationNumbers = ({currentPage, totalDisplaying = 1, pages, handleNext, handlePrev, disable = false }:{
    currentPage: number,
    totalDisplaying: any,
    pages: number,
    disable: boolean,
    handleNext: () => void,
    handlePrev: () => void
}) => {
  return (
    
<div className="flex flex-col items-center">
  <span className="text-sm text-gray-700 dark:text-gray-400">
      Showing <span className="font-semibold text-green-100">{currentPage}</span> to 
      <span className="font-semibold text-green-100 ml-2">{totalDisplaying}</span> of 
      <span className="font-semibold text-green-100 ml-2">{pages}</span> Entries
  </span>
  <div className="inline-flex mt-2 xs:mt-0">
      <button className="px-4 py-2 text-sm font-medium text-white bg-zinc-700 rounded-l hover:bg-zinc-900"
        onClick={handlePrev}
        disabled={disable}
      >
          Prev
      </button>
      <button className="px-4 py-2 text-sm font-medium text-white bg-zinc-700 border-0 border-l border-zinc-700 rounded-r hover:bg-zinc-900"
        onClick={handleNext}
        disabled={disable}
      >
          Next
      </button>
  </div>
</div>

  )
}

export default PaginationNumbers
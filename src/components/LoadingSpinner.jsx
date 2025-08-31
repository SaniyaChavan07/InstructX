import {  LoaderCircleIcon } from 'lucide-react'


const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <LoaderCircleIcon className="animate-spin h-20 w-20 text-sky-500" />
      <p className="mt-4 text-lg  text-gray-700">Loading, please wait...</p>
    </div>
  )
}

export default LoadingSpinner
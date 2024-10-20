
import SearchBar from "./components/SearchBar";
function App() {
 

  return (

    <div>
      <div className="flex justify-start w-full gap-0  bg-slate-800 h-20 p-5">
    <p className="   font-bold text-stone-100 text-3xl ">Movie</p>
    <p className="   font-bold text-slate-500 text-3xl  ">Time..</p>
    </div>
     <SearchBar />
     
    </div>
  )
}

export default App

import './App.css'

function App() {

  return (
    <div>
      <header className="p-3 flex justify-between bg-primary1">
        {/* Logo */}
        <a href="" className='flex items-center gap-1'>
          <img className='w-10 h-10' src="../public/logo.png" alt="" />
          <span className='font-bold text-xl text-primary2 mb-1'>Stellar</span>
        </a>
        {/* Search Bar */}
        <div className="flex items-center gap-2 border border-accent2 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <div className="text-primary2">Event Location</div>
          <div className="border-l border-accent2 px-2 text-primary2">Event Date & Time</div>
          <div className="border-l border-accent2 px-2 text-primary2">Invite Attendees</div>
          <button className="bg-secondary2 rounded-full px-3 py-2">
            <i class="fi fi-rs-search"></i>
          </button>
        </div>
        {/* User Profile */}
        <div className="flex items-center gap-2 border border-accent2 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <div className="px-1">
            <i class="fi fi-br-menu-burger text-primary2"></i>
          </div>
          <div className="px-3 py-2 bg-secondary2 rounded-full">
            <i class="fi fi-rr-user text-primary2"></i>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App

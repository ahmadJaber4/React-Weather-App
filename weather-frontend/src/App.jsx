import { Routes, Route } from "react-router-dom"
import HomePage from './HomePage/HomePage'
import BrowsePage from './BrowsePage/BrowsePage'
import SavedPage from './SavedPage/SavedPage'


function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
    </>
  )
}

export default App

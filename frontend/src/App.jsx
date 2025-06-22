import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 //import { Toaster } from "@/components/ui/toaster";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import sonner from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index.jsx";
import './App.css'


// const queryclient = new QueryClient();

// const App = () => {
//   <QueryClientProvider client={queryclient}>
//     <TooltipProvider>

//       <Sonner/>
//       {/* <BrowsRouter> */}
//         <Routes>
//           <Route path="/" element={<Index/>}/>
//           <Route path="*" element={<NotFound/>}/>
//         </Routes>
//        {/* </BrowsRouter> */}
//     </TooltipProvider>
//   </QueryClientProvider>
// }

function App(){
  return(
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
     </Routes>
    </BrowserRouter>
  )
}
export default App

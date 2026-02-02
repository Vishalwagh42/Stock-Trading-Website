import { useEffect } from "react";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // redirect back to landing signup page
      window.location.href = "http://localhost:3000/signup";
    }
  }, []);

  return (
    <div>
      {/* your existing dashboard components */}
    </div>
  );
}

export default App;
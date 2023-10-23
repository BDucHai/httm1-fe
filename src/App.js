import "./App.css";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { publicRoutes } from "./routes/routes";

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <DefaultLayout>
                                <route.component />
                            </DefaultLayout>
                        }
                    />
                ))}
            </Routes>
        </div>
    );
}

export default App;

import { Header } from "./components/Header";
import { Widget } from "./components/Widget";
import "tailwindcss/tailwind.css";
import "./global.css";
import { ThemeProvider } from "next-themes";

export function App() {

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Header />
      <Widget />
    </ThemeProvider>
  )
}
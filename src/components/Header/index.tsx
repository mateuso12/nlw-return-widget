import { ToggleThemeButton } from "./ToggleThemeButton";
import {useTheme} from "next-themes";
import{SunIcon ,MoonIcon} from "@heroicons/react/solid";
import { useEffect, useState } from "react";


export function Header() {
  const {systemTheme , theme, setTheme} = useTheme ();

  const [mounted, setMounted] = useState(false);
  
  useEffect(() =>{
    setMounted(true);
  },[])

  const renderThemeChanger= () => {

    if(!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme ;

    if(currentTheme ==="dark"){
      return (
        <SunIcon className="w-10 h-10 text-yellow-500 " role="button" onClick={() => setTheme('light')} />
      )
    }

    else {
      return (
        <MoonIcon className="w-10 h-10 text-gray-900 " role="button" onClick={() => setTheme('dark')} />
      )
    }
   };


  return (
    <header className="flex items-center justify-between gap-3 px-4 py-2 bg-white dark:bg-zinc-900">
      <div className="flex">
        <div className="flex items-center ml">
          <a href="#" className="flex items-center">
            <span className="ml-6 text-2xl font-bold text-zinc-500 dark:text-zinc-400">
              FeedGet
            </span>
          </a>
        </div>
        <div className="flex items-center ml-8">
          <a href="#" className="flex items-center">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 ">
              About
            </span>
          </a>
          <a href="#" className="flex items-center ml-4">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Help
            </span>
          </a>
        </div>
      </div>
      {renderThemeChanger()}
    </header>
  )

}
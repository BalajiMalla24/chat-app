import { create } from "zustand";

export const userThemeStore = create((set)=>({
      theme:localStorage.getItem("chat-theme")|| "coffee",
      settheme: (theme )=>{
        localStorage.setItem("chat-theme" , theme)
        set({theme})
      }
}))
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface props {
  isOpen: boolean
  setIsOpen: (newbool: boolean) => void
}

const SettingsOverlay = ({ isOpen, setIsOpen }: props) => {
  const {t, i18n } = useTranslation();
  if (!isOpen) return null;

  const changelang = (lang:string)=>{
      i18n.changeLanguage(lang)
      setIsOpen(false)
    }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/85 flex flex-col items-center justify-center backdrop-blur-md p-4 transition-opacity duration-500">

      <div className="bg-white rounded-4xl shadow-2xl p-8 flex flex-col items-center max-w-lg w-full text-center border-4 border-teal-600 relative overflow-hidden">
        <h2 className="text-3xl font-black text-teal-800 mb-2">
          {t("settings.title")}
        </h2>
        <button className='m-3  absolute top-0 right-0 z-50
     p-2 text-xs font-black
    bg-[#11B0A5] text-white
    rounded-lg shadow-md tracking-wide uppercase
    transition-transform
    hover:scale-105 active:scale-95'
          onClick={() => setIsOpen(false)}>
          <X size={20} />
        </button>
        <p className="text-slate-600 mb-6 font-medium">
          {t("settings.lang")}
        </p>
        <div>
          <button
            className='m-3 
     p-5 text-xs font-black
    bg-[#11B0A5] text-white
    rounded-lg shadow-md tracking-wide uppercase
    transition-transform
    hover:scale-105 active:scale-95'
            onClick={() => changelang("nl")}>
            <img src="/Flags/Netherlands.webp" className="object-cover h-10 w-15 rounded-md"/>
          </button>
          <button
            className='m-3  
     p-5 text-xs font-black
    bg-[#11B0A5] text-white
    rounded-lg shadow-md tracking-wide uppercase
    transition-transform
    hover:scale-105 active:scale-95' onClick={() => changelang("en")}>
             <img src="/Flags/UK.webp" className="object-cover h-10 w-17 rounded-md"/>
          </button>
          <button
            className='m-3
     p-5 text-xs font-black
    bg-[#11B0A5] text-white
    rounded-lg shadow-md tracking-wide uppercase
    transition-transform
    hover:scale-105 active:scale-95'
            onClick={() => changelang("fr")}>
            <img src="/Flags/France.webp" className="object-cover h-10 w-15 rounded-md"/>
          </button>
        </div>


      </div>


    </div>
  )
}

export default SettingsOverlay
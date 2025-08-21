import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">☪️</div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            404 - صفحة غير موجودة
          </h1>
          <p className="text-xl font-semibold text-slate-600 mb-2">Page Not Found</p>
          <div className="text-slate-600 mb-8">
            <p className="arabic-text text-xl mb-4" style={{ fontFamily: "serif" }}>
              إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
            </p>
            <p className="text-md text-slate-500">
              "Indeed, to Allah we belong and to Allah we shall return."
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-6 mt-6">
          <p className="text-slate-600 mb-6">
            The page you are looking for might have been moved or does not exist.
          </p>
          <button 
            onClick={handleGoHome}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Return to Home
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-500">
            "Seek knowledge even if you have to go as far as China." - Prophet Muhammad (PBUH)
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
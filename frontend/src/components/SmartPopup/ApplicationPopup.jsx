import { useState } from 'react'

export default function ApplicationPopup({ job, onConfirm }) {
    const [choice, setChoice] = useState(null)

    const handleChoice = (confirmed, type) => {
        setChoice(type)
        setTimeout(() => {
            onConfirm(confirmed, type)
        }, 300)
    }

    return (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/50 rounded-2xl md:rounded-3xl p-5 md:p-8 max-w-md w-full shadow-2xl animate-scale-in">
                {/* Header */}
                <div className="text-center mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-500/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-500 md:w-8 md:h-8">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22,4 12,14.01 9,11.01" />
                        </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1 md:mb-2">Welcome back!</h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Did you apply to this job?</p>
                </div>

                {/* Job Summary */}
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                    <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-700 flex-shrink-0"
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=6366f1&color=fff`
                        }}
                    />
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs md:text-sm truncate">{job.title}</div>
                        <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 truncate">{job.company}</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 md:space-y-3">
                    <button
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl font-medium text-xs md:text-sm transition-all duration-150 flex items-center justify-center gap-2
                            ${choice === 'applied'
                                ? 'bg-emerald-500 text-white shadow-lg scale-95'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:shadow'
                            }`}
                        onClick={() => handleChoice(true, 'applied')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-5 md:h-5">
                            <polyline points="20,6 9,17 4,12" />
                        </svg>
                        Yes, Applied
                    </button>

                    <button
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl font-medium text-xs md:text-sm transition-all duration-150 flex items-center justify-center gap-2
                            ${choice === 'browsing'
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 scale-95'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                            }`}
                        onClick={() => handleChoice(false, 'browsing')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-5 md:h-5">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        No, Just Browsing
                    </button>

                    <button
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl font-medium text-xs md:text-sm transition-all duration-150 flex items-center justify-center gap-2
                            ${choice === 'earlier'
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 scale-95'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                            }`}
                        onClick={() => handleChoice(true, 'earlier')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-5 md:h-5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                        </svg>
                        Applied Earlier
                    </button>
                </div>
            </div>
        </div>
    )
}

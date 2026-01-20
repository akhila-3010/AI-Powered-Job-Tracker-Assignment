import { useState, useEffect } from 'react'
import JobCard from './JobCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export default function JobFeed({ jobs, loading, hasResume, onApply, applications }) {
    const [bestMatches, setBestMatches] = useState([])
    const [loadingBest, setLoadingBest] = useState(false)

    useEffect(() => {
        if (hasResume) {
            fetchBestMatches()
        } else {
            setBestMatches([])
        }
    }, [hasResume])

    const fetchBestMatches = async () => {
        setLoadingBest(true)
        try {
            const res = await fetch(`${API_URL}/jobs/best-matches?limit=8`)
            const data = await res.json()
            setBestMatches(data.jobs || [])
        } catch (error) {
            console.error('Error fetching best matches:', error)
        } finally {
            setLoadingBest(false)
        }
    }

    const isApplied = (jobId) => {
        return applications?.some(app => app.jobId === jobId)
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <div className="w-10 h-10 border-[3px] border-slate-300 dark:border-slate-600 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-slate-600 dark:text-slate-400 font-medium">Fetching latest opportunities...</p>
            </div>
        )
    }

    return (
        <div className="space-y-12">
            {/* Resume Upload Prompt */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-850/50 border border-slate-200 dark:border-slate-700/60 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
                    <svg className="w-8 h-8 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="flex-1 space-y-2 text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                        {hasResume ? "Review your tailored matches" : "Upload your resume to see match scores"}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                        {hasResume
                            ? "We've analyzed your skills. Here are the jobs that best align with your professional profile."
                            : "Get personalized job recommendations based on your unique skills and experience."}
                    </p>
                </div>
            </div>

            {/* Best Matches Section */}
            {hasResume && bestMatches.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Best Matches For You</h2>
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 px-3 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                            TAILORED
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bestMatches.slice(0, 4).map((job, index) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                index={index}
                                onApply={onApply}
                                applied={isApplied(job.id)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* All Jobs Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">All Jobs</h2>
                    <div className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
                    </div>
                </div>

                {jobs.length === 0 ? (
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-3xl p-16 md:p-20 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-700 text-3xl opacity-60">
                            🔍
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">No matching jobs</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
                            Try adjusting your filters to discover more opportunities.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobs.map((job, index) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                index={index}
                                onApply={onApply}
                                applied={isApplied(job.id)}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

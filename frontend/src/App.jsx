import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import JobFeed from './components/JobFeed/JobFeed'
import FilterPanel from './components/Filters/FilterPanel'
import ApplicationTracker from './components/ApplicationTracker/ApplicationTracker'
import AISidebar from './components/AISidebar/AISidebar'
import ResumeModal from './components/ResumeUpload/ResumeModal'
import ApplicationPopup from './components/SmartPopup/ApplicationPopup'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function App() {
  const [activeTab, setActiveTab] = useState('jobs')
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [showAISidebar, setShowAISidebar] = useState(false)
  const [hasResume, setHasResume] = useState(false)
  const [pendingApplication, setPendingApplication] = useState(null)
  const [filters, setFilters] = useState({
    query: '',
    skills: [],
    datePosted: 'all',
    jobType: 'all',
    workMode: 'all',
    location: '',
    minScore: 0
  })

  // Debounced query state for performance optimization
  const [debouncedQuery, setDebouncedQuery] = useState(filters.query)

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState([])

  useEffect(() => {
    checkResume()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(filters.query)
    }, 400)

    return () => clearTimeout(timer)
  }, [filters.query])

  useEffect(() => {
    if (activeTab === 'jobs') {
      fetchJobs()
    }
  }, [
    activeTab,
    debouncedQuery,
    filters.skills,
    filters.datePosted,
    filters.jobType,
    filters.workMode,
    filters.location,
    filters.minScore,
    hasResume
  ])

  useEffect(() => {
    if (activeTab === 'applications') {
      fetchApplications()
    }
  }, [activeTab])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && pendingApplication) {
        // Trigger popup when user returns after clicking Apply
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [pendingApplication])

  const checkResume = async () => {
    try {
      const res = await fetch(`${API_URL}/resume`)
      const data = await res.json()
      setHasResume(data.hasResume)


      if (!data.hasResume) {
        setTimeout(() => setShowResumeModal(true), 1000)
      }
    } catch (error) {
      console.error('Error checking resume:', error)
    }
  }

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (debouncedQuery) params.append('query', debouncedQuery)
      if (filters.skills.length) params.append('skills', filters.skills.join(','))
      if (filters.datePosted !== 'all') params.append('datePosted', filters.datePosted)
      if (filters.jobType !== 'all') params.append('jobType', filters.jobType)
      if (filters.workMode !== 'all') params.append('workMode', filters.workMode)
      if (filters.location) params.append('location', filters.location)
      if (filters.minScore > 0) params.append('minScore', filters.minScore)

      const res = await fetch(`${API_URL}/jobs?${params}`)
      const data = await res.json()
      setJobs(data.jobs || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API_URL}/applications`)
      const data = await res.json()
      setApplications(data.applications || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  const handleApply = (job) => {
    setPendingApplication({
      ...job,
      clickedAt: new Date().toISOString()
    })

    // Open job URL in new tab
    window.open(job.applyUrl, '_blank')
  }

  const handleApplicationConfirm = async (confirmed, type) => {
    if (confirmed && pendingApplication) {
      try {
        await fetch(`${API_URL}/applications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId: pendingApplication.id,
            jobTitle: pendingApplication.title,
            company: pendingApplication.company,
            applyUrl: pendingApplication.applyUrl,
            status: 'applied'
          })
        })
        fetchApplications()
      } catch (error) {
        console.error('Error saving application:', error)
      }
    }
    setPendingApplication(null)
  }

  const handleResumeUpload = () => {
    setHasResume(true)
    setShowResumeModal(false)
    fetchJobs()
  }

  const updateApplicationStatus = async (appId, status) => {
    try {
      await fetch(`${API_URL}/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      fetchApplications()
    } catch (error) {
      console.error('Error updating application:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onResumeClick={() => setShowResumeModal(true)}
        onAIClick={() => setShowAISidebar(!showAISidebar)}
        hasResume={hasResume}
        filters={filters}
        onFilterChange={setFilters}
      />

      <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6 max-w-[1600px] mx-auto w-full">
        {activeTab === 'jobs' && (
          <>
            {/* Filter Panel - Desktop Only */}
            <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-6">
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                hasResume={hasResume}
              />
              <JobFeed
                jobs={jobs}
                loading={loading}
                hasResume={hasResume}
                onApply={handleApply}
                applications={applications}
              />
            </div>

            {/* Job Feed - Mobile Only (No Filter Panel) */}
            <div className="lg:hidden">
              <JobFeed
                jobs={jobs}
                loading={loading}
                hasResume={hasResume}
                onApply={handleApply}
                applications={applications}
              />
            </div>
          </>
        )}

        {activeTab === 'applications' && (
          <ApplicationTracker
            applications={applications}
            onStatusChange={updateApplicationStatus}
            onRefresh={fetchApplications}
          />
        )}
      </main>

      {/* Modals and Sidebars */}
      {showResumeModal && (
        <ResumeModal
          onClose={() => setShowResumeModal(false)}
          onUpload={handleResumeUpload}
          hasExisting={hasResume}
        />
      )}

      {showAISidebar && (
        <AISidebar onClose={() => setShowAISidebar(false)} />
      )}

      {pendingApplication && (
        <ApplicationPopup
          job={pendingApplication}
          onConfirm={handleApplicationConfirm}
        />
      )}
    </div>
  )
}

export default App

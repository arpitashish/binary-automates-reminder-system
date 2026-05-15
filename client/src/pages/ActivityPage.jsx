import { useEffect, useState } from 'react'
import http from '../api/http'
import toast from 'react-hot-toast'
import ActivityTimeline from '../components/ActivityTimeline'
import { SkeletonCard } from '../components/Skeleton'

export default function ActivityPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    http.get('/activity')
      .then((res) => setItems(res.data.data))
      .catch(() => toast.error('Failed to load activity'))
      .finally(() => setLoading(false))
  }, [])

  return loading ? <div className="grid gap-4 md:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}</div> : <ActivityTimeline items={items} />
}

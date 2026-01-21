import type { Activity } from "@/lib/types"

interface RecentActivitiesProps {
  activities: Activity[]
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No recent activities</p>
      ) : (
        <ul className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
              <div
                className={`w-2 h-2 mt-2 rounded-full ${
                  activity.type === "update" ? "bg-blue-500" : activity.type === "alert" ? "bg-red-500" : "bg-green-500"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


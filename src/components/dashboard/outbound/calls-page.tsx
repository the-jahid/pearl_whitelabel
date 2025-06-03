import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Calendar } from "lucide-react"

const calls = [
  { from: "+393399908011", to: "+393667247352", date: "5/31/2025 - 09:16 PM", duration: 15, status: "Unreachable" },
  { from: "+393399908011", to: "+393515066598", date: "5/31/2025 - 09:16 PM", duration: 6, status: "Unreachable" },
  { from: "+393399908011", to: "+393279429499", date: "5/31/2025 - 09:16 PM", duration: 5, status: "Unreachable" },
  { from: "+393399908011", to: "+393298752719", date: "5/31/2025 - 09:16 PM", duration: 3, status: "Unreachable" },
  { from: "+393399908011", to: "+393338413185", date: "5/31/2025 - 09:15 PM", duration: 3, status: "Unreachable" },
  { from: "+393399908011", to: "+393394827106", date: "5/31/2025 - 09:15 PM", duration: 16, status: "Unreachable" },
  { from: "+393399908011", to: "+393376192237", date: "5/31/2025 - 09:15 PM", duration: 3, status: "Unreachable" },
  { from: "+393399908011", to: "+393664488011", date: "5/31/2025 - 09:16 PM", duration: 15, status: "Unreachable" },
  { from: "+393399908011", to: "+393392867665", date: "5/31/2025 - 09:14 PM", duration: 2, status: "Unreachable" },
  { from: "+393399908011", to: "+393271915943", date: "5/31/2025 - 09:14 PM", duration: 6, status: "Unreachable" },
]

export default function CallsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-black">Calls</h1>
          <span className="text-gray-500">1515</span>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-black">05/30/2025 - 06/03/2025</span>
          </div>

          <Select defaultValue="status">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="unreachable">Unreachable</SelectItem>
              <SelectItem value="answered">Answered</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="tags">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tags & Events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tags">Tags & Events</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Search" className="w-48" />
        </div>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">From</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">To</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Duration</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Tags</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Events</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((call, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-black">{call.from}</td>
                    <td className="py-4 px-4 text-sm text-black">{call.to}</td>
                    <td className="py-4 px-4 text-sm text-black">{call.date}</td>
                    <td className="py-4 px-4 text-sm text-black">{call.duration}</td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        {call.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4"></td>
                    <td className="py-4 px-4"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows to show</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 rows</SelectItem>
                  <SelectItem value="25">25 rows</SelectItem>
                  <SelectItem value="50">50 rows</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600">page 1 of 152</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

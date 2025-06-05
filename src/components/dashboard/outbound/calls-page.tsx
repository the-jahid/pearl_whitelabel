"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Calendar, X, ArrowRight } from "lucide-react"

// Sample call data
const calls = [
  {
    id: 1,
    from: "+393399908011",
    to: "+393667247352",
    date: "5/31/2025 - 09:16 PM",
    duration: 15,
    status: "Unreachable",
  },
  {
    id: 2,
    from: "+393399908011",
    to: "+393515066598",
    date: "5/31/2025 - 09:16 PM",
    duration: 6,
    status: "Unreachable",
  },
  {
    id: 3,
    from: "+393399908011",
    to: "+393279429499",
    date: "5/31/2025 - 09:16 PM",
    duration: 5,
    status: "Unreachable",
  },
  {
    id: 4,
    from: "+393399908011",
    to: "+393298752719",
    date: "5/31/2025 - 09:16 PM",
    duration: 3,
    status: "Unreachable",
  },
  {
    id: 5,
    from: "+393399908011",
    to: "+393338413185",
    date: "5/31/2025 - 09:15 PM",
    duration: 3,
    status: "Unreachable",
  },
  {
    id: 6,
    from: "+393399908011",
    to: "+393394827106",
    date: "5/31/2025 - 09:15 PM",
    duration: 16,
    status: "Unreachable",
  },
  {
    id: 7,
    from: "+393399908011",
    to: "+393376192237",
    date: "5/31/2025 - 09:15 PM",
    duration: 3,
    status: "Unreachable",
  },
  {
    id: 8,
    from: "+393399908011",
    to: "+393664488011",
    date: "5/31/2025 - 09:16 PM",
    duration: 15,
    status: "Unreachable",
  },
  {
    id: 9,
    from: "+393399908011",
    to: "+393392867665",
    date: "5/31/2025 - 09:14 PM",
    duration: 2,
    status: "Unreachable",
  },
  {
    id: 10,
    from: "+393399908011",
    to: "+393271915943",
    date: "5/31/2025 - 09:14 PM",
    duration: 6,
    status: "Unreachable",
  },
]

// Sample transcript data
const transcriptData = [
  { speaker: "caller", text: "Buongiorno, parlo con Filippo?", time: "00:02" },
  { speaker: "recipient", text: "Si, sono io con chi parlo?", time: "00:05" },
  {
    speaker: "caller",
    text: "D'accordo, sono Claudia AI di Digital Coach. Ho il tuo contatto in quanto ti sei registrato ad uno dei nostri Webinar. Volevo informarti che stiamo organizzando una Masterclass in cui mostreremo come gli Agenti di Intelligenza Artificiale possono ricoprire dei ruoli in aziende, riducendo i costi di personale, automatizzando il marketing e supportando forse vendite. Potrai vedere in azione i nostri Agenti IA e provarne alcune.",
    time: "00:09",
  },
]

export default function CallsPage() {
  const [selectedCall, setSelectedCall] = useState<(typeof calls)[0] | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleCallClick = (call: (typeof calls)[0]) => {
    setSelectedCall(call)
    setSidebarOpen(true)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-white">
      <div className={`flex-1 p-6 ${sidebarOpen ? "pr-0" : ""}`}>
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
                    {calls.map((call) => (
                      <tr
                        key={call.id}
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleCallClick(call)}
                      >
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
      </div>

      {/* Sidebar for call details */}
      {sidebarOpen && (
        <div className="w-96 border-l border-gray-200 h-full overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  IT
                </div>
                <ArrowRight className="h-4 w-4 mx-2" />
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                  IT
                </div>
              </div>
              <div className="text-sm font-medium">
                {selectedCall?.from} → {selectedCall?.to}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={closeSidebar}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4">
            <h3 className="text-sm font-medium mb-2">Summary</h3>
            <p className="text-sm text-gray-700 mb-4">
              The customer service agent, Claudia AI from Digital Coach, contacted Filippo, who had previously
              registered for one of their webinars. Claudia informed Filippo about an upcoming Masterclass that will
              demonstrate how AI agents can play roles in companies by reducing personnel costs, automating marketing,
              and supporting sales. Filippo was invited to see the AI agents in action and try some of them.
            </p>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="text-sm font-medium mb-2">Call Details</h3>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="text-sm text-gray-600">Duration</div>
                <div className="text-sm font-medium">00:34</div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="text-sm text-gray-600">Status</div>
                <div className="text-sm font-medium text-green-600">Completed</div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="text-sm font-medium mb-2">Variables</h3>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="text-sm text-gray-600">Full Name</div>
                <div className="text-sm font-medium">Filippo</div>
              </div>
            </div>

            <Tabs defaultValue="transcript" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="event-log">Event Log</TabsTrigger>
              </TabsList>
              <TabsContent value="transcript" className="pt-4">
                {transcriptData.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-start gap-2">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-xs ${item.speaker === "caller" ? "bg-red-500" : "bg-green-500"}`}
                      >
                        {item.speaker === "caller" ? "IT" : "IT"}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{item.text}</p>
                        <p className="text-xs text-gray-500 mt-1 text-right">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="event-log" className="pt-4">
                <p className="text-sm text-gray-500">No events recorded for this call.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import React from "react"
import { useState, useEffect } from "react"
import {
  Phone,
  Plus,
  Trash2,
  Download,
  Search,
  ArrowLeft,
  Play,
  Pause,
  Check,
  ChevronDown,
  Calendar,
  BarChart3,
} from "lucide-react"
import { useUser } from "@clerk/nextjs"

// Toast Hook
function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; description: string; variant?: string }>>([])

  const toast = ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, title, description, variant }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg max-w-sm ${
            toast.variant === "destructive" ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          <div className="font-semibold">{toast.title}</div>
          <div className="text-sm">{toast.description}</div>
        </div>
      ))}
    </div>
  )

  return { toast, ToastContainer }
}

// UI Components
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "destructive" | "outline" | "ghost"
    size?: "default" | "sm" | "lg"
  }
>(({ className = "", variant = "default", size = "default", ...props }, ref) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8",
  }

  return <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} ref={ref} {...props} />
})
Button.displayName = "Button"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className = "", ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  ),
)
Label.displayName = "Label"

const Badge = ({
  children,
  className = "",
  variant = "default",
}: { children: React.ReactNode; className?: string; variant?: "default" | "secondary" | "success" }) => {
  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-100 text-gray-900",
    success: "bg-green-600 text-white",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { onCheckedChange?: (checked: boolean) => void }
>(({ className = "", onCheckedChange, ...props }, ref) => (
  <input
    type="checkbox"
    className={`h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
    ref={ref}
    onChange={(e) => onCheckedChange?.(e.target.checked)}
    {...props}
  />
))
Checkbox.displayName = "Checkbox"

const Select = ({
  children,
  value,
  onValueChange,
}: { children: React.ReactNode; value: string; onValueChange: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && (child as React.ReactElement<{ value: string }>).props.value) {
              const childElement = child as React.ReactElement<{ value: string; children: React.ReactNode }>
              return (
                <div
                  className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100"
                  onClick={() => {
                    onValueChange(childElement.props.value)
                    setIsOpen(false)
                  }}
                >
                  {value === childElement.props.value && (
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  {childElement.props.children}
                </div>
              )
            }
            return child
          })}
        </div>
      )}
    </div>
  )
}

const SelectTrigger = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)

const SelectValue = ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>

const SelectContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

const SelectItem = ({ value, children }: SelectItemProps) => <div data-value={value}>{children}</div>

const Tabs = ({
  children,
  value,
  onValueChange,
}: { children: React.ReactNode; value: string; onValueChange: (value: string) => void }) => (
  <div data-value={value} data-onvaluechange={onValueChange}>
    {children}
  </div>
)

const TabsList = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}>
    {children}
  </div>
)

const TabsTrigger = ({
  value,
  children,
  className = "",
  onValueChange,
}: { value: string; children: React.ReactNode; className?: string; onValueChange?: (value: string) => void }) => (
  <button
    type="button"
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
    onClick={() => onValueChange?.(value)}
  >
    {children}
  </button>
)

const TabsContent = ({
  value,
  children,
  className = "",
  activeValue,
}: { value: string; children: React.ReactNode; className?: string; activeValue?: string }) => {
  if (activeValue && activeValue !== value) return null
  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  )
}

// Main Component Interfaces
interface Lead {
  id: string
  firstName: string
  phoneNumber: string
  createdAt: string
  timeZone: string
  referenceId?: string
  status: "pending" | "call-successful" | "need-retry" | "completed" | "calling"
  retryCount?: number
  lastCalled?: string
}

interface CallRecord {
  id: string
  callId: string
  authId: string
  leadId: string
  leadData: {
    firstName: string
    phoneNumber: string
    timeZone: string
    referenceId?: string
  }
  timestamp: string
  status: "successful" | "failed"
}

export default function LeadsManagement() {
  const { user } = useUser()
  const [currentView, setCurrentView] = useState<"leads" | "call-records" | "add-lead">("leads")
  const [leads, setLeads] = useState<Lead[]>([])
  const [callRecords, setCallRecords] = useState<CallRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [callRecordsSearchTerm, setCallRecordsSearchTerm] = useState("")
  const [statusFilter] = useState("all")
  const [rowsToShow, setRowsToShow] = useState(10)
  const [callRecordsRowsToShow, setCallRecordsRowsToShow] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [callRecordsCurrentPage, setCallRecordsCurrentPage] = useState(1)
  const { toast, ToastContainer } = useToast()

  // Add Lead Form States
  const [addLeadTab, setAddLeadTab] = useState<"upload" | "manual">("upload")
  const [firstName, setFirstName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [timeZone, setTimeZone] = useState("(UTC+06:00) Dhaka")
  const [referenceId, setReferenceId] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  // Bulk calling states
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set())
  const [isBulkCalling, setIsBulkCalling] = useState(false)
  const [bulkCallSettings, setBulkCallSettings] = useState({
    delayBetweenCalls: 30,
  })
  const [bulkCallProgress, setBulkCallProgress] = useState({
    current: 0,
    total: 0,
    currentLead: null as Lead | null,
  })

  // Load data from localStorage
  useEffect(() => {
    const savedLeads = localStorage.getItem("nlpearl-leads")
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads))
      } catch (error) {
        console.error("Error parsing saved leads:", error)
      }
    }

    const savedRecords = localStorage.getItem("nlpearl-call-records")
    if (savedRecords) {
      try {
        setCallRecords(JSON.parse(savedRecords))
      } catch (error) {
        console.error("Error parsing saved call records:", error)
      }
    }
  }, [])

  // Save leads to localStorage
  useEffect(() => {
    localStorage.setItem("nlpearl-leads", JSON.stringify(leads))
  }, [leads])

  // Function to save successful call to localStorage
  const saveSuccessfulCall = (lead: Lead, callId: string) => {
    if (!user?.id) {
      console.error("No user ID available from Clerk")
      return
    }

    const callRecord: CallRecord = {
      id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      callId,
      authId: user.id,
      leadId: lead.id,
      leadData: {
        firstName: lead.firstName,
        phoneNumber: lead.phoneNumber,
        timeZone: lead.timeZone,
        referenceId: lead.referenceId,
      },
      timestamp: new Date().toISOString(),
      status: "successful",
    }

    // Get existing call records
    const existingRecords = localStorage.getItem("nlpearl-call-records")
    let updatedCallRecords: CallRecord[] = []

    if (existingRecords) {
      try {
        updatedCallRecords = JSON.parse(existingRecords)
      } catch (error) {
        console.error("Error parsing existing call records:", error)
        updatedCallRecords = []
      }
    }

    // Add new record to the beginning of the array
    updatedCallRecords.unshift(callRecord)

    // Save back to localStorage
    localStorage.setItem("nlpearl-call-records", JSON.stringify(updatedCallRecords))
    setCallRecords(updatedCallRecords)

    console.log("Call record saved:", callRecord)
  }

  const addLeadManually = (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName.trim() || !phoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      })
      return
    }

    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    const newLead: Lead = {
      id: Date.now().toString(),
      firstName: firstName.trim(),
      phoneNumber: phoneNumber.trim(),
      createdAt: new Date().toISOString(),
      timeZone,
      referenceId: referenceId.trim() || undefined,
      status: "pending",
      retryCount: 0,
    }

    setLeads((prev) => [newLead, ...prev])

    // Reset form
    setFirstName("")
    setPhoneNumber("")
    setReferenceId("")
    setAgreeTerms(false)
    setCurrentView("leads")

    toast({
      title: "Success",
      description: "Lead added successfully",
    })
  }

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast({
        title: "Error",
        description: "Please upload a CSV file",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        console.log("Raw CSV content:", text) // Debug log

        // Split by lines and filter out empty lines
        const lines = text.split(/\r?\n/).filter((line) => line.trim())

        if (lines.length < 2) {
          toast({
            title: "Error",
            description: "CSV file must contain at least a header row and one data row",
            variant: "destructive",
          })
          return
        }

        // Parse header row
        const headerLine = lines[0]
        const headers = headerLine.split(",").map((h) => h.trim().toLowerCase().replace(/['"]/g, ""))
        console.log("Headers found:", headers) // Debug log

        // Find name and phone columns with flexible matching
        const nameIndex = headers.findIndex(
          (h) => h.includes("name") || h.includes("first") || h.includes("firstname") || h.includes("first_name"),
        )

        const phoneIndex = headers.findIndex(
          (h) =>
            h.includes("phone") ||
            h.includes("number") ||
            h.includes("mobile") ||
            h.includes("tel") ||
            h.includes("contact"),
        )

        console.log("Name column index:", nameIndex, "Phone column index:", phoneIndex) // Debug log

        if (nameIndex === -1) {
          toast({
            title: "Error",
            description: `CSV must contain a column with 'name' in the header. Found columns: ${headers.join(", ")}`,
            variant: "destructive",
          })
          return
        }

        if (phoneIndex === -1) {
          toast({
            title: "Error",
            description: `CSV must contain a column with 'phone' or 'number' in the header. Found columns: ${headers.join(", ")}`,
            variant: "destructive",
          })
          return
        }

        const newLeads: Lead[] = []
        let skippedRows = 0

        // Process data rows
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (!line) continue

          // Simple CSV parsing - split by comma but handle quoted values
          const values: string[] = []
          let current = ""
          let inQuotes = false

          for (let j = 0; j < line.length; j++) {
            const char = line[j]
            if (char === '"') {
              inQuotes = !inQuotes
            } else if (char === "," && !inQuotes) {
              values.push(current.trim())
              current = ""
            } else {
              current += char
            }
          }
          values.push(current.trim()) // Add the last value

          console.log(`Row ${i} values:`, values) // Debug log

          if (values.length > Math.max(nameIndex, phoneIndex)) {
            const name = values[nameIndex]?.trim().replace(/['"]/g, "") || ""
            let phone = values[phoneIndex]?.trim().replace(/['"]/g, "") || ""

            console.log(`Processing: name="${name}", phone="${phone}"`) // Debug log

            if (name && phone) {
              // Handle scientific notation (e.g., 8.8E+12)
              if (phone.includes("E+") || phone.includes("e+")) {
                try {
                  const numericValue = Number.parseFloat(phone)
                  if (!isNaN(numericValue)) {
                    phone = Math.round(numericValue).toString()
                  }
                } catch (error) {
                  console.warn("Could not parse scientific notation:", phone, error)
                }
              }

              // Clean phone number - remove spaces, dashes, parentheses
              phone = phone.replace(/[\s\-()]/g, "")

              // Add + prefix if it doesn't start with + and looks like an international number
              if (!phone.startsWith("+") && phone.length >= 10) {
                phone = "+" + phone
              }

              // Validate phone number (should be at least 10 digits)
              const digitCount = phone.replace(/\D/g, "").length

              if (name.length > 0 && digitCount >= 10) {
                newLeads.push({
                  id: `${Date.now()}-${i}-${Math.random()}`,
                  firstName: name,
                  phoneNumber: phone,
                  createdAt: new Date().toISOString(),
                  timeZone: "(UTC+06:00) Dhaka",
                  status: "pending",
                  retryCount: 0,
                })
                console.log(`Added lead: ${name} - ${phone}`) // Debug log
              } else {
                console.log(
                  `Skipped row ${i}: invalid data - name: "${name}", phone: "${phone}", digits: ${digitCount}`,
                ) // Debug log
                skippedRows++
              }
            } else {
              console.log(`Skipped row ${i}: missing data - name: "${name}", phone: "${phone}"`) // Debug log
              skippedRows++
            }
          } else {
            console.log(`Skipped row ${i}: insufficient columns`) // Debug log
            skippedRows++
          }
        }

        console.log(`Total leads processed: ${newLeads.length}, skipped: ${skippedRows}`) // Debug log

        if (newLeads.length === 0) {
          toast({
            title: "Error",
            description: "No valid leads found in the CSV file. Please check the format and data.",
            variant: "destructive",
          })
          return
        }

        // Add leads to the list
        setLeads((prev) => [...newLeads, ...prev])
        setCurrentView("leads")

        let message = `${newLeads.length} leads imported successfully`
        if (skippedRows > 0) {
          message += ` (${skippedRows} rows skipped due to missing or invalid data)`
        }

        toast({
          title: "Success",
          description: message,
        })

        // Reset file input
        if (event.target) {
          event.target.value = ""
        }
      } catch (error) {
        console.error("CSV parsing error:", error)
        toast({
          title: "Error",
          description: `Failed to parse CSV file: ${error instanceof Error ? error.message : "Unknown error"}`,
          variant: "destructive",
        })
      }
    }

    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read the file",
        variant: "destructive",
      })
    }

    reader.readAsText(file)
  }

  const makeCall = async (lead: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status: "calling" as const } : l)))

    try {
      const response = await fetch("/api/make-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: lead.phoneNumber,
          leadId: lead.id,
          callData: {
            firstName: lead.firstName,
            referenceId: lead.referenceId,
            timeZone: lead.timeZone,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Generate a call ID (you might get this from your API response)
        const callId = data.callId || `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        // Save successful call to localStorage
        saveSuccessfulCall(lead, callId)

        setLeads((prev) =>
          prev.map((l) =>
            l.id === lead.id
              ? {
                  ...l,
                  status: "call-successful" as const,
                  lastCalled: new Date().toISOString(),
                }
              : l,
          ),
        )

        toast({
          title: "Call Initiated",
          description: `Call to ${lead.firstName} started. Queue position: ${data.queuePosition}`,
        })
      } else {
        const retryCount = (lead.retryCount || 0) + 1
        setLeads((prev) =>
          prev.map((l) =>
            l.id === lead.id
              ? {
                  ...l,
                  status: retryCount >= 3 ? "completed" : "need-retry",
                  retryCount,
                  lastCalled: new Date().toISOString(),
                }
              : l,
          ),
        )

        toast({
          title: "Call Failed",
          description: data.detail || "Failed to initiate call",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Network error during call:", error)
      const retryCount = (lead.retryCount || 0) + 1
      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id
            ? {
                ...l,
                status: retryCount >= 3 ? "completed" : "need-retry",
                retryCount,
                lastCalled: new Date().toISOString(),
              }
            : l,
        ),
      )

      toast({
        title: "Error",
        description: "Network error occurred while making call",
        variant: "destructive",
      })
    }
  }

  const startBulkCalling = async () => {
    const selectedLeadsList = leads.filter((lead) => selectedLeads.has(lead.id))

    if (selectedLeadsList.length === 0) {
      toast({
        title: "No leads selected",
        description: "Please select at least one lead to call",
        variant: "destructive",
      })
      return
    }

    setIsBulkCalling(true)
    setBulkCallProgress({
      current: 0,
      total: selectedLeadsList.length,
      currentLead: selectedLeadsList[0],
    })

    for (let i = 0; i < selectedLeadsList.length; i++) {
      if (!isBulkCalling) break

      const lead = selectedLeadsList[i]
      setBulkCallProgress((prev) => ({
        ...prev,
        current: i + 1,
        currentLead: lead,
      }))

      await makeCall(lead)

      if (i < selectedLeadsList.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, bulkCallSettings.delayBetweenCalls * 1000))
      }
    }

    setIsBulkCalling(false)
    setBulkCallProgress({ current: 0, total: 0, currentLead: null })
    setSelectedLeads(new Set())

    toast({
      title: "Bulk calling completed",
      description: `Finished calling ${selectedLeadsList.length} leads`,
    })
  }

  const getStatusBadge = (status: Lead["status"], retryCount?: number) => {
    switch (status) {
      case "call-successful":
        return <Badge className="bg-green-500 text-white">Call Successful</Badge>
      case "need-retry":
        return <Badge className="bg-orange-500 text-white">Need Retry {retryCount ? `${retryCount}/3` : ""}</Badge>
      case "completed":
        return <Badge className="bg-green-600 text-white">Completed</Badge>
      case "calling":
        return <Badge className="bg-blue-500 text-white">Calling...</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  const downloadCSVTemplate = () => {
    const csvContent = `name,number
jahid,8.8E+12
sabbir,8.8E+12
rahman,+8801555123456`
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "leads_template.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const exportCallRecordsToCSV = () => {
    const headers = [
      "Call ID",
      "Auth ID",
      "Lead Name",
      "Phone Number",
      "Time Zone",
      "Reference ID",
      "Timestamp",
      "Status",
    ]
    const csvContent = [
      headers.join(","),
      ...callRecords.map((record) =>
        [
          record.callId,
          record.authId,
          record.leadData.firstName,
          record.leadData.phoneNumber,
          record.leadData.timeZone,
          record.leadData.referenceId || "",
          record.timestamp,
          record.status,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `call-records-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const clearAllCallRecords = () => {
    if (window.confirm("Are you sure you want to clear all call records? This action cannot be undone.")) {
      localStorage.removeItem("nlpearl-call-records")
      setCallRecords([])
    }
  }

  // Filter data
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || lead.phoneNumber.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredCallRecords = callRecords.filter((record) => {
    const matchesSearch =
      record.leadData.firstName.toLowerCase().includes(callRecordsSearchTerm.toLowerCase()) ||
      record.leadData.phoneNumber.includes(callRecordsSearchTerm) ||
      record.callId.toLowerCase().includes(callRecordsSearchTerm.toLowerCase())
    return matchesSearch
  })

  // Pagination
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * rowsToShow, currentPage * rowsToShow)
  const totalLeadsPages = Math.ceil(filteredLeads.length / rowsToShow)

  const paginatedCallRecords = filteredCallRecords.slice(
    (callRecordsCurrentPage - 1) * callRecordsRowsToShow,
    callRecordsCurrentPage * callRecordsRowsToShow,
  )
  const totalCallRecordsPages = Math.ceil(filteredCallRecords.length / callRecordsRowsToShow)

  // Add Lead View
  if (currentView === "add-lead") {
    return (
      <div className="min-h-screen bg-white text-black">
        <ToastContainer />
        <div className="container mx-auto p-6 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("leads")}
              className="text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Add Lead</h1>
          </div>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <Tabs value={addLeadTab} onValueChange={(value) => setAddLeadTab(value as "manual" | "upload")}>
                <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                  <TabsTrigger
                    value="upload"
                    className="data-[state=active]:bg-gray-200"
                    onValueChange={(value) => setAddLeadTab(value as "upload" | "manual")}
                  >
                    Upload Files
                  </TabsTrigger>
                  <TabsTrigger
                    value="manual"
                    className="data-[state=active]:bg-gray-200"
                    onValueChange={(value) => setAddLeadTab(value as "upload" | "manual")}
                  >
                    Manually
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-6" activeValue={addLeadTab}>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={downloadCSVTemplate}
                        className="border-gray-300 text-black hover:bg-gray-100"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Template File CSV
                      </Button>
                      <Button
                        variant="outline"
                        onClick={downloadCSVTemplate}
                        className="border-gray-300 text-black hover:bg-gray-100"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Template File XLSX
                      </Button>
                    </div>

                    <Input id="csv-upload" type="file" accept=".csv" onChange={handleCSVUpload} />
                    <Label htmlFor="csv-upload" className="cursor-pointer">
                      <Button className="bg-blue-600 hover:bg-blue-700">Choose File</Button>
                    </Label>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="mt-6" activeValue={addLeadTab}>
                  <form onSubmit={addLeadManually} className="space-y-6">
                    <div>
                      <Label className="text-black mb-2 block">Phone Number</Label>
                      <p className="text-gray-600 text-sm mb-3">
                        Phone number in the format of country code + phone number (eg. +1 123456789)
                      </p>
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-white border-gray-300 text-black"
                        placeholder="+1234567890"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-black mb-2 block">first name</Label>
                      <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-white border-gray-300 text-black"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-black mb-2 block">Timezone</Label>
                      <p className="text-gray-600 text-sm mb-3">If not provided the campaign timezone will be used.</p>
                      <Select value={timeZone} onValueChange={setTimeZone}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300">
                          <SelectItem value="(UTC+06:00) Dhaka">(UTC+06:00) Dhaka</SelectItem>
                          <SelectItem value="(UTC+00:00) London">(UTC+00:00) London</SelectItem>
                          <SelectItem value="(UTC-05:00) New York">(UTC-05:00) New York</SelectItem>
                          <SelectItem value="(UTC+01:00) Paris">(UTC+01:00) Paris</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-black mb-2 block">Reference ID</Label>
                      <p className="text-gray-600 text-sm mb-3">
                        This is the lead&apos;s ID in your CRM for reference.
                      </p>
                      <Input
                        type="text"
                        value={referenceId}
                        onChange={(e) => setReferenceId(e.target.value)}
                        className="bg-white border-gray-300 text-black"
                        placeholder="Optional"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox id="terms" checked={agreeTerms} onCheckedChange={setAgreeTerms} className="mt-1" />
                      <Label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                        By checking this box, I represent and agree that I use AI-powered calls and texts provided by
                        the platform (&apos;AI Calls&apos;) in compliance with applicable laws and regulations. I
                        confirm that I: (a) do not initiate AI Calls without prior explicit consent from the recipients;
                        (b) clearly identify my company as the responsible entity at the beginning of the AI Calls; (c)
                        provide an easy opt-out method immediately after I identify my company; and (d) do not generate
                        deceptive or fraudulent AI Calls.
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={!agreeTerms}>
                      Add Lead
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Call Records View
  if (currentView === "call-records") {
    return (
      <div className="min-h-screen bg-white text-black">
        <ToastContainer />
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("leads")}
                className="text-black hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">Call Records</h1>
              <Badge variant="secondary" className="bg-gray-100 text-black">
                {filteredCallRecords.length}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search records..."
                  value={callRecordsSearchTerm}
                  onChange={(e) => setCallRecordsSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-black w-64"
                />
              </div>
              <Button
                onClick={exportCallRecordsToCSV}
                variant="outline"
                className="border-gray-300 text-black hover:bg-gray-100"
                disabled={callRecords.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={clearAllCallRecords} variant="destructive" disabled={callRecords.length === 0}>
                Clear All
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Calls</p>
                    <p className="text-2xl font-bold">{callRecords.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Successful Calls</p>
                    <p className="text-2xl font-bold">{callRecords.filter((r) => r.status === "successful").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Today&apos;s Calls</p>
                    <p className="text-2xl font-bold">
                      {
                        callRecords.filter((r) => new Date(r.timestamp).toDateString() === new Date().toDateString())
                          .length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call Records Table */}
          <Card className="bg-white border-gray-200">
            <CardContent className="p-0">
              {callRecords.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">No call records found</p>
                  <p className="text-sm">Call records will appear here after successful calls are made.</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-gray-200">
                        <tr className="text-left">
                          <th className="p-4 text-gray-600 text-sm">Call ID</th>
                          <th className="p-4 text-gray-600 text-sm">Lead Name</th>
                          <th className="p-4 text-gray-600 text-sm">Phone Number</th>
                          <th className="p-4 text-gray-600 text-sm">Time Zone</th>
                          <th className="p-4 text-gray-600 text-sm">Reference ID</th>
                          <th className="p-4 text-gray-600 text-sm">Timestamp</th>
                          <th className="p-4 text-gray-600 text-sm">Auth ID</th>
                          <th className="p-4 text-gray-600 text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedCallRecords.map((record) => (
                          <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-4 text-sm font-mono text-blue-600">{record.callId}</td>
                            <td className="p-4 text-sm font-medium">{record.leadData.firstName}</td>
                            <td className="p-4 text-sm">{record.leadData.phoneNumber}</td>
                            <td className="p-4 text-sm text-gray-500">{record.leadData.timeZone}</td>
                            <td className="p-4 text-sm text-gray-500">{record.leadData.referenceId || "-"}</td>
                            <td className="p-4 text-sm">
                              <div>
                                <div>{new Date(record.timestamp).toLocaleDateString()}</div>
                                <div className="text-xs text-gray-500">
                                  {new Date(record.timestamp).toLocaleTimeString()}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-sm font-mono text-gray-600">{record.authId.slice(0, 8)}...</td>
                            <td className="p-4">
                              <Badge variant={record.status === "successful" ? "success" : "secondary"}>
                                {record.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between p-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Rows to show</span>
                      <select
                        value={callRecordsRowsToShow}
                        onChange={(e) => setCallRecordsRowsToShow(Number(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        Page {callRecordsCurrentPage} of {totalCallRecordsPages}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setCallRecordsCurrentPage(Math.max(1, callRecordsCurrentPage - 1))}
                          disabled={callRecordsCurrentPage === 1}
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-black hover:bg-gray-100"
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() =>
                            setCallRecordsCurrentPage(Math.min(totalCallRecordsPages, callRecordsCurrentPage + 1))
                          }
                          disabled={callRecordsCurrentPage === totalCallRecordsPages}
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-black hover:bg-gray-100"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Main Leads View
  return (
    <div className="min-h-screen bg-white text-black">
      <ToastContainer />
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Leads</h1>
            <Badge variant="secondary" className="bg-gray-100 text-black">
              {filteredLeads.length}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setCurrentView("call-records")}
                variant="outline"
                className="border-gray-300 text-black hover:bg-gray-100"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Call Records ({callRecords.length})
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-black w-64"
                />
              </div>
            </div>
            <Button onClick={() => setCurrentView("add-lead")} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* User Info Display */}
        {user && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              Logged in as: <span className="font-medium">{user.emailAddresses[0]?.emailAddress}</span> (ID:{" "}
              <span className="font-mono text-xs">{user.id}</span>)
            </p>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedLeads.size > 0 && (
          <Card className="bg-white border-gray-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm">{selectedLeads.size} leads selected</span>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Delay (seconds):</Label>
                    <Input
                      type="number"
                      min="5"
                      max="300"
                      value={bulkCallSettings.delayBetweenCalls}
                      onChange={(e) =>
                        setBulkCallSettings((prev) => ({
                          ...prev,
                          delayBetweenCalls: Number.parseInt(e.target.value, 10) || 30,
                        }))
                      }
                      className="w-20 bg-white border-gray-300 text-black"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isBulkCalling ? (
                    <Button onClick={() => setIsBulkCalling(false)} variant="destructive" size="sm">
                      <Pause className="h-4 w-4 mr-1" />
                      Stop
                    </Button>
                  ) : (
                    <Button onClick={startBulkCalling} className="bg-green-600 hover:bg-green-700" size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Start Bulk Call
                    </Button>
                  )}
                  <Button
                    onClick={() => setSelectedLeads(new Set())}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-black hover:bg-gray-100"
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
              {isBulkCalling && bulkCallProgress.total > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">
                      Progress: {bulkCallProgress.current} / {bulkCallProgress.total}
                    </span>
                    {bulkCallProgress.currentLead && (
                      <span className="text-sm text-gray-400">Calling: {bulkCallProgress.currentLead.firstName}</span>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(bulkCallProgress.current / bulkCallProgress.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Leads Table */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr className="text-left">
                    <th className="p-4 w-12">
                      <Checkbox
                        checked={selectedLeads.size === paginatedLeads.length && paginatedLeads.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLeads(new Set(paginatedLeads.map((lead) => lead.id)))
                          } else {
                            setSelectedLeads(new Set())
                          }
                        }}
                      />
                    </th>
                    <th className="p-4 text-gray-600 text-sm">Created</th>
                    <th className="p-4 text-gray-600 text-sm">Phone Number</th>
                    <th className="p-4 text-gray-600 text-sm">first name</th>
                    <th className="p-4 text-gray-600 text-sm">Time Zone</th>
                    <th className="p-4 text-gray-600 text-sm">Reference ID</th>
                    <th className="p-4 text-gray-600 text-sm">Status</th>
                    <th className="p-4 text-gray-600 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4">
                        <Checkbox
                          checked={selectedLeads.has(lead.id)}
                          onCheckedChange={(checked) => {
                            const newSelected = new Set(selectedLeads)
                            if (checked) {
                              newSelected.add(lead.id)
                            } else {
                              newSelected.delete(lead.id)
                            }
                            setSelectedLeads(newSelected)
                          }}
                        />
                      </td>
                      <td className="p-4 text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-sm">{lead.phoneNumber}</td>
                      <td className="p-4 text-sm">{lead.firstName}</td>
                      <td className="p-4 text-sm text-gray-400">{lead.timeZone}</td>
                      <td className="p-4 text-sm text-gray-400">{lead.referenceId || "-"}</td>
                      <td className="p-4">{getStatusBadge(lead.status, lead.retryCount)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => makeCall(lead)}
                            disabled={lead.status === "calling" || isBulkCalling}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => setLeads((prev) => prev.filter((l) => l.id !== lead.id))}
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rows to show</span>
                <Select value={rowsToShow.toString()} onValueChange={(value) => setRowsToShow(Number.parseInt(value))}>
                  <SelectTrigger className="w-20 bg-white border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  page {currentPage} of {totalLeadsPages}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-black hover:bg-gray-100"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(Math.min(totalLeadsPages, currentPage + 1))}
                    disabled={currentPage === totalLeadsPages}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-black hover:bg-gray-100"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

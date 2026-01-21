"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Metadata is now in metadata.ts file

function SettingsContent() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("account");
  const [date, setDate] = useState<Date>();

  // Set the active tab based on the URL query parameter
  useEffect(() => {
    setMounted(true);
    const tab = searchParams.get("tab");
    if (tab === "preferences" || tab === "profile" || tab === "notifications") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="container py-6">
      <PageHeader
        title="Settings"
        description="Configure your system preferences and account settings"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-[600px] grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and login details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="font-medium">Username</div>
                  <Input value="forestadmin" />
                  <div className="text-sm text-muted-foreground">
                    This is your public display name.
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="font-medium">Email</div>
                  <Input value="admin@forestdb.com" />
                  <div className="text-sm text-muted-foreground">
                    Your email address is used for notifications and login.
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="font-medium">Current Password</div>
                  <Input type="password" placeholder="Enter current password" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="font-medium">New Password</div>
                  <Input type="password" placeholder="Enter new password" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="font-medium">Confirm Password</div>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Account Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Authenticator App</div>
                  <div className="text-sm text-muted-foreground">
                    Use an authenticator app to generate one-time codes
                  </div>
                </div>
                <Button variant="outline">Setup</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">SMS Recovery</div>
                  <div className="text-sm text-muted-foreground">
                    Get codes sent to your phone for recovery
                  </div>
                </div>
                <Button variant="outline">Add Phone</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Edit your profile details and personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/profile-avatar.jpg" alt="Forest Admin" />
                  <AvatarFallback className="text-2xl">FA</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div>
                    <div className="font-medium">Profile Picture</div>
                    <div className="text-sm text-muted-foreground">
                      Upload a new profile picture or avatar.
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Upload
                    </Button>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="font-medium">First Name</div>
                  <Input value="Forest" />
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Last Name</div>
                  <Input value="Admin" />
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Job Title</div>
                  <Input value="Senior Forest Officer" />
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Department</div>
                  <Select defaultValue="conservation">
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservation">Conservation</SelectItem>
                      <SelectItem value="enforcement">Enforcement</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="administration">
                        Administration
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Location</div>
                  <Select defaultValue="northern">
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="northern">Northern Forest</SelectItem>
                      <SelectItem value="eastern">Eastern Ridge</SelectItem>
                      <SelectItem value="western">Western Valley</SelectItem>
                      <SelectItem value="southern">Southern Meadow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Date Joined</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "January 12, 2023"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="font-medium">Bio</div>
                <Textarea
                  placeholder="Tell us about yourself"
                  defaultValue="Experienced Forest Officer with over 7 years of experience in wildlife conservation and forest resource management. Specialized in monitoring endangered species and implementing sustainable forestry practices."
                  className="min-h-[100px]"
                />
                <div className="text-sm text-muted-foreground">
                  Briefly describe your role and experience.
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">Skills & Expertise</div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Wildlife Conservation</Badge>
                  <Badge>Resource Management</Badge>
                  <Badge>Sustainable Forestry</Badge>
                  <Badge>GIS Mapping</Badge>
                  <Badge>Environmental Law</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 rounded-full"
                  >
                    + Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme & Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">Theme</div>
                <div className="grid grid-cols-3 gap-4">
                  {mounted && (
                    <>
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        onClick={() => setTheme("light")}
                        className="justify-start"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#FAFAFA] border mr-2"></div>
                        Light
                      </Button>

                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        onClick={() => setTheme("dark")}
                        className="justify-start"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#1F1F1F] border mr-2"></div>
                        Dark
                      </Button>

                      <Button
                        variant={theme === "system" ? "default" : "outline"}
                        onClick={() => setTheme("system")}
                        className="justify-start"
                      >
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FAFAFA] to-[#1F1F1F] border mr-2"></div>
                        System
                      </Button>
                    </>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Choose your preferred color scheme for the application.
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Compact View</div>
                  <div className="text-sm text-muted-foreground">
                    Use a compact view for tables and lists to see more data at
                    once
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Animations</div>
                  <div className="text-sm text-muted-foreground">
                    Enable animations and transitions throughout the interface
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">High Contrast</div>
                  <div className="text-sm text-muted-foreground">
                    Increase contrast for better visibility and accessibility
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="font-medium">Font Size</div>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium (Default)</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground">
                  Adjust the size of text throughout the application.
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Theme Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">System Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Important system alerts and security notifications
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">
                        Resource Updates
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Changes to forest resources and inventory
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">
                        Wildlife Tracking
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Updates on monitored wildlife movement
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">
                        Reports & Analytics
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Periodic reports and analytical summaries
                      </div>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">
                        Task Assignments
                      </div>
                      <div className="text-sm text-muted-foreground">
                        When you are assigned a new task or responsibility
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">Mentions</div>
                      <div className="text-sm text-muted-foreground">
                        When you are mentioned in a note or comment
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">New Data</div>
                      <div className="text-sm text-muted-foreground">
                        When new data is added to the system
                      </div>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="font-medium">Notification Summary</div>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Select summary frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground">
                  Receive a summary of all notifications at your preferred
                  frequency.
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}

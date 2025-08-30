import React from "react"
import { BreadcrumbItem } from "./breadcrumb"

// Utility function to generate breadcrumb items from path
export function generateBreadcrumbItems(
  path: string,
  basePath: string = "/",
  customLabels?: Record<string, string>
): BreadcrumbItem[] {
  const segments = path.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = []
  
  let currentPath = basePath
  
  segments.forEach((segment, index) => {
    currentPath += segment + '/'
    const isLast = index === segments.length - 1
    
    items.push({
      label: customLabels?.[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: isLast ? undefined : currentPath,
      isCurrentPage: isLast,
      icon: isLast ? 'file' : 'folder' // Use string identifiers instead of JSX
    })
  })
  
  return items
}

// Helper function to create breadcrumb items from a simple array
export function createBreadcrumbItems(
  labels: string[],
  basePath: string = "/",
  customIcons?: Record<string, React.ReactNode>
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []
  
  let currentPath = basePath
  
  labels.forEach((label, index) => {
    currentPath += label.toLowerCase().replace(/\s+/g, '-') + '/'
    const isLast = index === labels.length - 1
    
    items.push({
      label,
      href: isLast ? undefined : currentPath,
      isCurrentPage: isLast,
      icon: customIcons?.[label] || undefined
    })
  })
  
  return items
}

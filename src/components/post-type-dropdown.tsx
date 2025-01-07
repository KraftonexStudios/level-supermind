import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Image, Film, Layers, LayoutGrid } from 'lucide-react'

type PostType = 'All' | 'Carousel' | 'Reels' | 'Static Image'

interface PostTypeDropdownProps {
  value: PostType
  onChange: (value: PostType) => void
}

const postTypeIcons = {
  All: LayoutGrid,
  Carousel: Layers,
  Reels: Film,
  'Static Image': Image
}

export function PostTypeDropdown({ value, onChange }: PostTypeDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select post type" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(postTypeIcons).map(([type, Icon]) => (
          <SelectItem key={type} value={type} className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span>{type}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}


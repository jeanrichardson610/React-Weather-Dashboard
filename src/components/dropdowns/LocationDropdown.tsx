import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
    location: string
    setLocation: Dispatch<SetStateAction<string>>
}

export default function LocationDropdown({ location, setLocation }: Props) {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
  <SelectTrigger className="w-45">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent className='z-1001'>
    {location === 'custom' && (
      <SelectItem key="custom" value="custom">
        Custom
      </SelectItem>
    )}
    {locations.map((city) => (
      <SelectItem key={city} value={city}>{city}</SelectItem>
    ))}
  </SelectContent>
</Select>
  )
}

const locations = [
  "Tokyo",
  "Paris",
  "London",
  "New York",
  "Dubai",
  "Singapore",
  "Bangkok",
  "Hong Kong",
  "Barcelona",
  "Rome",
  "Istanbul",
  "Los Angeles",
  "Amsterdam",
  "Milan",
  "Shanghai",
  "Seoul",
  "San Francisco",
  "Chicago",
  "Vienna",
  "Prague",
  "Sydney",
  "Madrid",
];

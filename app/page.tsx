import OwnershipTable from '@/components/global/OwnershipTable'
import BestVehicleSection from '@/components/sections/BestVehicleSection'
import DatabaseSection from '@/components/sections/DatabaseSection'
import HomeHeroSection from '@/components/sections/HomeHeroSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <HomeHeroSection />
      <BestVehicleSection />
      {/* <OwnershipTable /> */}
      <DatabaseSection />
    </div>
  )
}

export default page
import OwnershipTable from '@/components/global/OwnershipTable'
import BestVehicleSection from '@/components/sections/BestVehicleSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import DatabaseSection from '@/components/sections/DatabaseSection'
import DecisionSection from '@/components/sections/DecisionSection'
import HomeHeroSection from '@/components/sections/HomeHeroSection'
import KnowledgeSection from '@/components/sections/KnowledgeSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <HomeHeroSection />
      <BestVehicleSection />
      {/* <OwnershipTable /> */}
      <DatabaseSection />
      <KnowledgeSection />
      <ComparisonSection />
      <DecisionSection />
    </div>
  )
}

export default page
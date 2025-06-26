import React from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'

const ApplicationCard = ({application,isCandidate = false}) => {
  return (
   <Card>
    <CardHeader>
        <CardTitle>
            {
                isCandidate 
                ? `${application?.job?.title} at ${application?.job?.company?.name}` 
             : application?.name 
            }
        </CardTitle>
    </CardHeader>
   </Card>
  )
}

export default ApplicationCard
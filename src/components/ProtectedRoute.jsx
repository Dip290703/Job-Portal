import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const {isSignedIn,isLoaded,user} = useUser()
    const {pathName}= useLocation()
    if(isLoaded && !isSignedIn && isSignedIn !== undefined){
        return <Navigate to='/?sign-in=true' />
    }
    if(
        user !== undefined &&
        !user?.unsafeMetadata?.role &&
        pathName !== "/onboarding"
    )
    return <Navigate to='/onboarding'/>
    return children
}

export default ProtectedRoute
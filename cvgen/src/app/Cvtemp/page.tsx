import React from 'react'

import CvOneColumn from '../components/templates/CvOneColumn'
import CvHeaderBanner from '../components/templates/CvHeaderBanner'
import CvSidebarDark from '../components/templates/CvSideBarDark'
import CvTwoColumn from '../components/templates/CvTwoColumn'
import Cvtemplate from '../components/templates/cv-template'
import ZoomWrapper from '../components/zoomWrapper'
const home = () => {
  return (
    <div>
      {/* <ZoomWrapper>
      </ZoomWrapper> */}
        <Cvtemplate></Cvtemplate>
    </div>
  )
}

export default home
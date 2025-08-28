import React from 'react'

import CvOneColumn from '../components/templates/CvOneColumn'
import CvHeaderBanner from '../components/templates/CvHeaderBanner'
import CvSidebarDark from '../components/templates/CvSideBarDark'
import CvTwoColumn from '../components/templates/CvTwoColumn'
import Cvtemplate from '../components/templates/cv-template'
import ZoomWrapper from '../components/zoomWrapper'
import data from '../../../public/generated-cv.json'
const home = () => {
  return (
    <div>
      {/* <ZoomWrapper>
      </ZoomWrapper> */}
        <CvOneColumn  ></CvOneColumn>
    </div>
  )
}

export default home
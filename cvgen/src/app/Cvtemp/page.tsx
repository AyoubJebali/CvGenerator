import React from 'react'
import Cvtemplate from '../components/cv-templates/cv-template'
import CvTemplatePdf from '../components/cv-templates/CvTemplatePdf'
import CvTemplateHeaderBanner from '../components/cv-templates/cvTemplate3'
import CvTemplateSidebarDark from '../components/cv-templates/cvTemplate3'
import CvTemplateTwoColumn from '../components/cv-templates/cvTemplate3'
import CvTemplateOneColumn from '../components/cv-templates/one-column-cv-template'
import ZoomWrapper from '../components/zoomWrapper'
const home = () => {
  return (
    <div>
      <ZoomWrapper>
        <CvTemplateOneColumn></CvTemplateOneColumn>
      </ZoomWrapper>
    </div>
  )
}

export default home
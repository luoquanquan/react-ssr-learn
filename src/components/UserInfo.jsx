import React from 'react'
import { Helmet } from 'react-helmet'

export default () => (
  <div>
    this page is the UserInfo

    <Helmet>
      <title>Contact Page</title>
      <meta name="description" content="This is a proof of concept for React SSR" />
    </Helmet>
  </div>
)

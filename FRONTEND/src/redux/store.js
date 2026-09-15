import { configureStore } from '@reduxjs/toolkit'

import userslice from './userslice.js'
export default configureStore({
  reducer: {
    user : userslice
  },
})
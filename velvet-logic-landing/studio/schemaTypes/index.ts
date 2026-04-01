import { localizedString } from './localizedString'
import { localizedText } from './localizedText'
import { localizedBlockContent } from './localizedBlockContent'
import { heroType } from './hero'
import { testimonialsType } from './testimonials'
import { processType } from './process'
import { valuesType } from './values'
import { contactType } from './contact'
import { navigationType } from './navigation'
import { homePageType } from './homePage'
import { settingsType } from './settings'

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedBlockContent,
  homePageType,
  heroType,
  testimonialsType,
  processType,
  valuesType,
  contactType,
  navigationType,
  settingsType,
]

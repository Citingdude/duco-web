import { audienceCollections } from '@payload/collections/audience/audience.collections'
import { employeeCollections } from '@payload/collections/employees/employee.collections'
import { environmentCollections } from '@payload/collections/environments/environment.collections'
import { mediaCollections } from '@payload/collections/medias/media.collections'
import { pageCollections } from '@payload/collections/pages/page.collections'
import { productCollections } from '@payload/collections/products/product.collections'
import { referenceCollections } from '@payload/collections/references/reference.collections'
import { userCollections } from '@payload/collections/users/user.collections'

export default [
  ...pageCollections,
  ...userCollections,
  ...mediaCollections,
  ...productCollections,
  ...audienceCollections,
  ...employeeCollections,
  ...environmentCollections,
  ...referenceCollections,
]

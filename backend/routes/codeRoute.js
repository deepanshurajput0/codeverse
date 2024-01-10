import express from "express"
import { createCode, deleteCode, getCodeBySearch, getCodeByTags, getCodes, getCodesByUser, getRelatedCodesByTag, getSingleCode, likeCount, updateUserCode } from "../controllers/codeController.js"
import { authMiddlware } from "../middlewares/auth.js"
const router = express.Router()


router.route('/search').get(getCodeBySearch)
router.route('/relatedcodes').post(getRelatedCodesByTag)
router.route('/tags/:tag').get(getCodeByTags)
router.route('/createcode').post(authMiddlware,createCode)
router.route('/like/:id').patch(authMiddlware,likeCount)
router.route('/getcode').get(getCodes)
router.route('/code/:id').get(getSingleCode)
router.route('/userCodes/:id').get(getCodesByUser)
router.route('/deletecode/:id').delete(authMiddlware,deleteCode)
router.route('/editcode/:id').put(authMiddlware,updateUserCode)
export default router


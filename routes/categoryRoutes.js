const expresss=require('express')
const router=expresss.Router()
const categoryController =require('../controllers/categoryController')
const verifyJWT =require('../middleware/verifyJWT')

//use middleware
router.use(verifyJWT)

router.get('/',categoryController.getAllCategories)
router.get('/getCategory/:id',categoryController.getSingleCategory)
router.post('/',categoryController.createCategory)
router.put('/',categoryController.updateCategory)
router.delete('/',categoryController.deleteCategory)

module.exports=router
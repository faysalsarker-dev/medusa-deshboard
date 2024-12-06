// src/api/admin/uploads/route.ts


import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import multer from "multer"
import path from "path"
import { FileService } from '@medusajs/medusa';

// Declare the image folder
const uploadDir = path.join(process.cwd(), "uploads")

// Configure multer to store files in the uploads directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Error uploading file" })
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const fileService: FileService = req.scope.resolve("fileService")

    try {
      const result = await fileService.upload({
        files: [{
          path: req.file.path,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
        }],
      })

      res.status(200).json({ 
        message: "File uploaded successfully",
        file: result[0]
      })
    } catch (error) {
      res.status(500).json({ message: "Error uploading file", error })
    }
  })
}
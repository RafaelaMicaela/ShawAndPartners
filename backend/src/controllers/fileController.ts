import { Request, Response } from 'express'
import csvParser from 'csv-parser'
import fs from 'fs'
import path from 'path'
import User from '../models/User'
import { Op } from 'sequelize'
import stripBomStream from 'strip-bom-stream'



export const uploadFile = async (req: Request, res: Response) => {
  const file = req.file

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }
  const filePath = path.join(__dirname, '../uploads/', file.filename)
  const results: any = []


  fs.createReadStream(filePath)
    .pipe(stripBomStream()) 
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        fs.unlinkSync(filePath)
        await User.destroy({ where: {} })

        await User.bulkCreate(results)

        res.status(200).json({ message: 'The file was uploaded and processed successfully.' })
      } catch (error) {
        res.status(500).json({ message: `Error processing file` })
      }
    })
    .on('error', (error) => {
      res.status(500).json({ message: `Error processing file: ${error.message}` })
    })
}

export const searchUsers = async (req: Request, res: Response) => {
  const query = req.query.q as string

  try {
    const results = await User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { city: { [Op.like]: `%${query}%` } },
          { country: { [Op.like]: `%${query}%` } },
          { favorite_sport: { [Op.like]: `%${query}%` } },
        ]
      }
    })
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ message: `Error searching users` })
  }
}
